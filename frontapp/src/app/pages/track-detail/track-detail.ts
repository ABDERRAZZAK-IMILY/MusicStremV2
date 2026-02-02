import { Component, inject, Input, computed, signal, OnInit, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { TrackService } from '../../services/track';
import { Router, RouterLink } from "@angular/router";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DurationPipe } from '../../core/pipes/duration-pipe';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectAllTracks } from '../../core/store/track.selectors';
import { AudioPlayerService } from '../../services/audio-player';

declare const lucide: any;

@Component({
  selector: 'app-track-detail',
  standalone: true,
  imports: [RouterLink, DurationPipe, CommonModule],
  templateUrl: './track-detail.html',
  styleUrl: './track-detail.css',
})
export class TrackDetail implements AfterViewInit {
  private trackservice = inject(TrackService);
  private store = inject(Store);
  audioPlayer = inject(AudioPlayerService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  @Input() id!: string;

  private allTracks = toSignal(this.store.select(selectAllTracks), { initialValue: [] });

  track = computed(() => {
    return this.allTracks().find(t => t.id === this.id);
  });

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      lucide.createIcons();
    }
  }

  playTrack() {
    const currentTrack = this.track();
    if (currentTrack) {
      this.audioPlayer.playTrack(currentTrack);
    }
  }

  deleteTrack() {
    if (confirm('Are you sure you want to delete this track?')) {
      this.trackservice.removeTrack(this.id);
      this.router.navigate(['/library']);
    }
  }
}