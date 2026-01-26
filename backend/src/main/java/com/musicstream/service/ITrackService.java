package com.musicstream.service;

import com.musicstream.dto.TrackDTO;

import java.util.List;

public interface ITrackService {

   List<TrackDTO> getAllTracks();
   TrackDTO saveTrack(TrackDTO trackDto, org.springframework.web.multipart.MultipartFile audio, org.springframework.web.multipart.MultipartFile cover) throws Exception;
   void deleteTrack(String id);

}
