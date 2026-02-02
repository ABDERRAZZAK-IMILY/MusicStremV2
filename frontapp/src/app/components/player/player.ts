import { Component, inject, AfterViewInit, DoCheck, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AudioPlayerService } from '../../services/audio-player';
import { DurationPipe } from '../../core/pipes/duration-pipe';

declare const lucide: any;

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, FormsModule, DurationPipe],
  templateUrl: './player.html',
  styleUrl: './player.css'
})
export class PlayerComponent implements AfterViewInit, DoCheck {
  audioPlayer = inject(AudioPlayerService);
  private platformId = inject(PLATFORM_ID);
  private previousTrack: any = null;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      lucide.createIcons();
    }
  }

  ngDoCheck() {
    const currentTrack = this.audioPlayer.currentTrack();
    if (currentTrack !== this.previousTrack) {
      this.previousTrack = currentTrack;
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => lucide.createIcons(), 0);
      }
    }
  }

  isclick = this.audioPlayer.isclicked;

  onSeek(event: any) {
    this.audioPlayer.seekTo(event.target.value);
  }

  onVolumeChange(event: any) {
    this.audioPlayer.setVolume(event.target.value);
  }

  togglePlay() {
    this.audioPlayer.togglePlay();
  }

  formatTime(time: number): string {
    if (!time || isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}