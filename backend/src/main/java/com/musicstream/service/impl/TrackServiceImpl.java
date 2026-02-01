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
        if (!Files.exists(root))
            Files.createDirectory(root);

        Track track = trackMapper.toEntity(trackDto);

        if (audio != null && !audio.isEmpty()) {
            String audioFilename = UUID.randomUUID() + "_" + audio.getOriginalFilename();
            Files.copy(audio.getInputStream(), this.root.resolve(audioFilename), StandardCopyOption.REPLACE_EXISTING);
            track.setAudioFileUrl("/uploads/" + audioFilename);
        }
        return trackMapper.toDTO(repository.save(track));
    }

    public TrackDTO updateTrack(String id, TrackDTO trackDto, MultipartFile audio, MultipartFile cover)
            throws Exception {
        if (!Files.exists(root))
            Files.createDirectory(root);

        Track existingTrack = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Track not found with id: " + id));

        // Update basic fields
        existingTrack.setTitle(trackDto.getTitle());
        existingTrack.setArtist(trackDto.getArtist());
        existingTrack.setGenre(trackDto.getGenre());
        existingTrack.setDescription(trackDto.getDescription());
        existingTrack.setDuration(trackDto.getDuration());

        // Update audio file if provided
        if (audio != null && !audio.isEmpty()) {
            String audioFilename = UUID.randomUUID() + "_" + audio.getOriginalFilename();
            Files.copy(audio.getInputStream(), this.root.resolve(audioFilename), StandardCopyOption.REPLACE_EXISTING);
            existingTrack.setAudioFileUrl("/uploads/" + audioFilename);
        }

        // Update cover image if provided
        if (cover != null && !cover.isEmpty()) {
            String coverFilename = UUID.randomUUID() + "_" + cover.getOriginalFilename();
            Files.copy(cover.getInputStream(), this.root.resolve(coverFilename), StandardCopyOption.REPLACE_EXISTING);
            existingTrack.setCoverImageUrl("/uploads/" + coverFilename);
        }

        return trackMapper.toDTO(repository.save(existingTrack));
    }

    // backend/src/main/java/com/musicstream/service/impl/TrackServiceImpl.java

    @Override
    public TrackDTO getTrackById(String id) {
        return repository.findById(id)
                .map(trackMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Track not found with id: " + id));
    }

    @Override
    public void deleteTrack(String id) {
        repository.deleteById(id);
    }
}