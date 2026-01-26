package com.musicstream.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrackDTO {
    private String id;
    private String title;
    private String artist;
    private String description;
    private LocalDateTime addedDate;
    private Integer duration;
    private String genre;
    private String coverImageUrl;
    private String audioFileUrl;
}