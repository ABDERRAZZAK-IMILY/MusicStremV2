package com.musicstream.controller;

import com.musicstream.dto.TrackDTO;
import com.musicstream.service.impl.TrackServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    private final TrackServiceImpl service;

    @GetMapping
    public List<TrackDTO> getTracks() {
        return service.getAllTracks();
    }

    @PostMapping(consumes = { "multipart/form-data" })
    public TrackDTO addTrack(
            @RequestPart("track") TrackDTO track,
            @RequestPart("audioFile") MultipartFile audio,
            @RequestPart(value = "coverImage", required = false) MultipartFile cover) throws Exception {
        track.setId(UUID.randomUUID().toString());
        track.setAddedDate(LocalDateTime.now());
        return service.saveTrack(track, audio, cover);
    }

    @PutMapping(value = "/{id}", consumes = { "multipart/form-data" })
    public TrackDTO updateTrack(
            @PathVariable String id,
            @RequestPart("track") TrackDTO track,
            @RequestPart(value = "audioFile", required = false) MultipartFile audio,
            @RequestPart(value = "coverImage", required = false) MultipartFile cover) throws Exception {
        track.setId(id);
        return service.updateTrack(id, track, audio, cover);
    }

    @DeleteMapping("/{id}")
    public void deleteTrack(@PathVariable String id) {
        service.deleteTrack(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrackDTO> getTrack(@PathVariable String id) {
        return ResponseEntity.ok(service.getTrackById(id));
    }
}