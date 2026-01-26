import { Component, inject, Input, signal } from '@angular/core';
import { TrackService } from '../../services/track';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-track-detail',
  imports: [RouterLink],
  templateUrl: './track-detail.html',
  styleUrl: './track-detail.css',
})
export class TrackDetail {

trackservice = inject(TrackService)

title = signal('');
artist = signal('');
description = signal('');
addedDate = signal<Date | null>(null);
duration = signal(0);
genre = signal('');
coverImage = signal<Blob | string | null>(null);
audioUrl = signal('');



@Input() id! : string;


getTrackById(){
  return this.trackservice.getTrackById(this.id);
}


loadTrackdetails(){
  const track = this.getTrackById();
  if(track){
    this.title.set(track.title);
    this.artist.set(track.artist);
    this.description.set(track.description || '');
    this.addedDate.set(track.addedDate);
    this.duration.set(track.duration);
    this.genre.set(track.genre);
    this.coverImage.set(track.coverImage || null);
    this.audioUrl.set(track.audioUrl);
  }
}



updateTrack(){
  const track = this.getTrackById();
  if(track){
    track.title = this.title();
    track.artist = this.artist();
    track.description = this.description();
    track.duration = this.duration();
    track.genre = this.genre();
    track.audioUrl = this.audioUrl();
    this.trackservice.updateTrack(this.id, track);
  }
}


}
