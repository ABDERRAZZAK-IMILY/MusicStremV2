package com.musicstream.mapper;

import com.musicstream.dto.TrackDTO;
import com.musicstream.model.Track;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TrackMapper {

    TrackDTO toDTO(Track track);

    Track toEntity(TrackDTO trackDTO);
}