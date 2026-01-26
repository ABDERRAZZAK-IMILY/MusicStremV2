package com.musicstream.service.impl;

import com.musicstream.dto.TrackDTO;
import com.musicstream.mapper.TrackMapper;
import com.musicstream.model.Track;
import com.musicstream.repository.TrackRepository;
import com.musicstream.service.ITrackService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrackServiceImpl implements ITrackService {

    private final TrackRepository repository;
    private final TrackMapper trackMapper;
    private final Path root = Paths.get("uploads");

    @Override
    public List<TrackDTO> getAllTracks() {
        return repository.findAll().stream()
                .map(trackMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TrackDTO saveTrack(TrackDTO trackDto, MultipartFile audio, MultipartFile cover) throws Exception {
        if (!Files.exists(root)) Files.createDirectory(root);

        Track track = trackMapper.toEntity(trackDto);

        if (audio != null && !audio.isEmpty()) {
            String audioFilename = UUID.randomUUID() + "_" + audio.getOriginalFilename();
            Files.copy(audio.getInputStream(), this.root.resolve(audioFilename), StandardCopyOption.REPLACE_EXISTING);
            track.setAudioFileUrl("/uploads/" + audioFilename);
        }
        return trackMapper.toDTO(repository.save(track));
    }

    @Override
    public void deleteTrack(String id) {
        repository.deleteById(id);
    }
}