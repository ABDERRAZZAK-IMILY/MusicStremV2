package com.musicstream.service;

import com.musicstream.dto.TrackDTO;
import com.musicstream.mapper.TrackMapper;
import com.musicstream.model.Track;
import com.musicstream.repository.TrackRepository;
import com.musicstream.service.impl.TrackServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TrackServiceImplTest {

    @Mock
    private TrackRepository trackRepository;

    @Mock
    private TrackMapper trackMapper;

    @InjectMocks
    private TrackServiceImpl trackService;

    private Track track;
    private TrackDTO trackDTO;
    private String trackId;

    @BeforeEach
    void setUp() {
        trackId = UUID.randomUUID().toString();
        track = new Track();
        track.setId(trackId);
        track.setTitle("Test Song");

        trackDTO = new TrackDTO();
        trackDTO.setId(trackId);
        trackDTO.setTitle("Test Song");
    }

    @Test
    void testGetTrackById_Success() {
        when(trackRepository.findById(trackId)).thenReturn(Optional.of(track));
        when(trackMapper.toDTO(track)).thenReturn(trackDTO);

        TrackDTO result = trackService.getTrackById(trackId);

        assertNotNull(result);
        assertEquals(trackId, result.getId());
        verify(trackRepository, times(1)).findById(trackId);
    }

    @Test
    void testGetTrackById_NotFound() {
        when(trackRepository.findById("invalid-id")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> trackService.getTrackById("invalid-id"));
    }

    @Test
    void testSaveTrack_Success() throws Exception {
        MockMultipartFile audioFile = new MockMultipartFile("audioFile", "test.mp3", "audio/mpeg", "test audio content".getBytes());
        MockMultipartFile coverImage = new MockMultipartFile("coverImage", "test.jpg", "image/jpeg", "test image content".getBytes());

        when(trackMapper.toEntity(any(TrackDTO.class))).thenReturn(track);
        when(trackRepository.save(any(Track.class))).thenReturn(track);
        when(trackMapper.toDTO(any(Track.class))).thenReturn(trackDTO);

        TrackDTO savedTrack = trackService.saveTrack(trackDTO, audioFile, coverImage);

        assertNotNull(savedTrack);
        verify(trackRepository, times(1)).save(any(Track.class));
    }

    @Test
    void testDeleteTrack_Success() {
        doNothing().when(trackRepository).deleteById(trackId);

        trackService.deleteTrack(trackId);

        verify(trackRepository, times(1)).deleteById(trackId);
    }
}