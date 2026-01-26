package com.musicstream.controller;

import com.musicstream.model.Track;
import com.musicstream.service.TrackService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tracks")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class TrackController {

    private final TrackService service;

    @GetMapping
    public List<Track> getTracks() {
        return service.getAllTracks();
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public Track addTrack(
            @RequestPart("track") Track track,
            @RequestPart("audioFile") MultipartFile audio,
            @RequestPart(value = "coverImage", required = false) MultipartFile cover
    ) throws Exception {
        track.setId(UUID.randomUUID().toString());
        track.setAddedDate(LocalDateTime.now());
        return service.saveTrack(track, audio, cover);
    }

    @DeleteMapping("/{id}")
    public void deleteTrack(@PathVariable String id) {
        service.deleteTrack(id);
    }
}