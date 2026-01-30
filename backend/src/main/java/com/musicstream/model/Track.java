package com.musicstream.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tracks")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Track {
    @Id
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