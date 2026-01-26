import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AudioPlayerService } from '../../services/audio-player';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player.html',
  styleUrl: './player.css'
})
export class PlayerComponent {
  playerService = inject(AudioPlayerService);

 isclick = this.playerService.isclicked;

  onSeek(event: any) {
    this.playerService.seekTo(event.target.value);
  }

  onVolumeChange(event: any) {
    this.playerService.setVolume(event.target.value);
  }
  
  togglePlay() {
    this.playerService.togglePlay();
  }
  
  formatTime(time: number): string {
    if (!time || isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}