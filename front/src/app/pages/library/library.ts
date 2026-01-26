import { Component, computed, effect, inject, OnInit, signal } from "@angular/core";
import { TrackService } from "../../services/track";
import { Track } from "../../models/track.model";
import { RouterLink } from "@angular/router";
import { AudioPlayerService } from "../../services/audio-player";
import { DurationPipe } from "../../duration-pipe";

@Component({
    selector: 'app-library',
    imports: [RouterLink, DurationPipe],
    templateUrl: './library.html',
    styleUrl: './library.css',
})
export class Library implements OnInit {

trackService = inject(TrackService);
audioPlayer = inject(AudioPlayerService);

ngOnInit() {
  this.trackService.init();
}

constructor() {
  effect(() => {
    const allTracks = this.trackService.getAllTracks();
    this.audioPlayer.playlist.set(allTracks);
  });
}

setClicked(){
  this.audioPlayer.isclicked.set(true);
}



searchQuery = signal<string>('');

selectedGenre = signal<string>('all');


tracks = signal<Track[]>([]);


tracksloaded = computed(() => {
  return this.trackService.getAllTracks();
});


  
 filteredTracks = computed(() => {
  const query = this.searchQuery().toLowerCase();
  const genre = this.selectedGenre();
  const tracks = this.trackService.getAllTracks();

  return tracks.filter((track: Track) => {
    const matchesSearch =
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query);

    const matchesGenre =
      genre === 'all' || track.genre === genre;

    return matchesSearch && matchesGenre;
  });
});




deleteTrack(id: string){
this.trackService.removeTrack(id);
}


onPlayTrack(track: Track,  event: Event) {
  event.stopPropagation();
  this.audioPlayer.playTrack(track);
}
    
}
