package com.musicstream.service;

import com.musicstream.model.Track;
import com.musicstream.repository.TrackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;
import java.util.*;

@Service
@RequiredArgsConstructor
public class TrackService {

    private final TrackRepository repository;

    private final Path root = Paths.get("uploads");

    public List<Track> getAllTracks() {
        return repository.findAll();
    }

    public Track saveTrack(Track track, MultipartFile audio, MultipartFile cover) throws IOException {
        if (!Files.exists(root)) Files.createDirectory(root);

        String audioName = UUID.randomUUID() + "_" + audio.getOriginalFilename();
        Files.copy(audio.getInputStream(), this.root.resolve(audioName));
        track.setAudioFileUrl("/uploads/" + audioName);

        if (cover != null) {
            String coverName = UUID.randomUUID() + "_" + cover.getOriginalFilename();
            Files.copy(cover.getInputStream(), this.root.resolve(coverName));
            track.setCoverImageUrl("/uploads/" + coverName);
        }

        return repository.save(track);
    }

    public void deleteTrack(String id) {
        repository.deleteById(id);
    }
}