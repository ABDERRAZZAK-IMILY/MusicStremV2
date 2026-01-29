import { Component, computed, effect, inject, OnInit, AfterViewInit, signal, PLATFORM_ID } from "@angular/core";
import { Store } from "@ngrx/store";
import { toSignal } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
import { TrackActions } from "../../core/store/track.actions";
import { selectAllTracks, selectTracksLoading } from "../../core/store/track.selectors";
import { AudioPlayerService } from "../../services/audio-player";
import { DurationPipe } from "../../components/duration-pipe";
import { Track } from "../../models/track.model";

declare const lucide: any;

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [RouterLink, DurationPipe],
  templateUrl: './library.html',
  styleUrl: './library.css',
})
export class Library implements OnInit, AfterViewInit {
  private store = inject(Store);
  audioPlayer = inject(AudioPlayerService);
  private platformId = inject(PLATFORM_ID);

  tracks = toSignal(this.store.select(selectAllTracks), { initialValue: [] });
  isLoading = toSignal(this.store.select(selectTracksLoading), { initialValue: false });

  searchQuery = signal<string>('');
  selectedGenre = signal<string>('all');

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      lucide.createIcons();
    }
  }

  ngOnInit() {
    this.store.dispatch(TrackActions.loadTracks());
  }

  constructor() {
    effect(() => {
      this.audioPlayer.playlist.set(this.tracks());
    });
  }

  filteredTracks = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const genre = this.selectedGenre();

    return this.tracks().filter((track: Track) => {
      const matchesSearch = track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query);
      const matchesGenre = genre === 'all' || track.genre.toLowerCase() === genre.toLowerCase();
      return matchesSearch && matchesGenre;
    });
  });

  setClicked() {
    this.audioPlayer.isclicked.set(true);
  }

  deleteTrack(id: string) {
    if (confirm('Are you sure you want to delete this track?')) {
      this.store.dispatch(TrackActions.deleteTrack({ id }));
    }
  }

  onPlayTrack(track: Track, event: Event) {
    this.audioPlayer.playTrack(track);
  }
}