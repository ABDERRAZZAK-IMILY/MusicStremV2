import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Track } from '../models/track.model';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private platformId = inject(PLATFORM_ID);
  private audio: HTMLMediaElement | null = null;
  private playPromise: Promise<void> | null = null;
  private currentAudioUrl: string | null = null;

  // State Signals
  currentTrack = signal<Track | null>(null);
  isPlaying = signal(false);
  currentTime = signal(0);
  duration = signal(0);
  volume = signal(0.5);
  currentIndex = signal(0);
  playlist = signal<Track[]>([]);
  isLoading = signal(false);
  isclicked = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.audio = new Audio();
      this.audio.volume = this.volume();
      this.initAudioListeners();
    }
  }

  private initAudioListeners() {
    if (!this.audio) return;

    this.audio.ontimeupdate = () => {
      this.currentTime.set(this.audio!.currentTime);
    };

    this.audio.onended = () => {
      this.isPlaying.set(false);
      this.currentTime.set(0);
      this.next();
    };

    this.audio.onloadedmetadata = () => {
      this.duration.set(this.audio!.duration);
      this.isLoading.set(false);
      this.playAudio();
    };

    this.audio.onwaiting = () => this.isLoading.set(true);
    this.audio.oncanplay = () => this.isLoading.set(false);
  }

  playTrack(track: Track) {
    if (!isPlatformBrowser(this.platformId) || !this.audio) return;

    if (this.currentTrack()?.id === track.id) {
      this.togglePlay();
      return;
    }

    this.isLoading.set(true);
    this.currentTrack.set(track);
    this.isclicked.set(true);

    const index = this.playlist().findIndex(t => t.id === track.id);
    if (index !== -1) {
      this.currentIndex.set(index);
    }

    let url = '';
    if (track.audioFileUrl) {
      url = `http://localhost:8080${track.audioFileUrl}`;
    } else if (track.audioFile) {
      url = URL.createObjectURL(track.audioFile);
    }

    if (url) {
      if (this.currentAudioUrl && this.currentAudioUrl.startsWith('blob:')) {
        URL.revokeObjectURL(this.currentAudioUrl);
      }
      this.currentAudioUrl = url;
      this.audio.src = url;
      this.audio.load();
    }
  }

  togglePlay() {
    if (!this.audio) return;
    if (this.audio.paused) {
      this.playAudio();
    } else {
      this.pauseAudio();
    }
  }

  private playAudio() {
    if (!this.audio) return;
    this.playPromise = this.audio.play();

    if (this.playPromise !== undefined) {
      this.playPromise
        .then(() => {
          this.isPlaying.set(true);
          this.playPromise = null;
        })
        .catch(err => {
          if (err.name !== 'AbortError') {
            console.error('Error playing audio:', err);
          }
          this.playPromise = null;
        });
    }
  }

  private pauseAudio() {
    if (!this.audio) return;
    if (this.playPromise !== null) {
      this.playPromise.then(() => {
        this.audio?.pause();
        this.isPlaying.set(false);
      });
    } else {
      this.audio.pause();
      this.isPlaying.set(false);
    }
  }

  seekTo(seconds: number) {
    if (!this.audio) return;
    this.audio.currentTime = seconds;
    this.currentTime.set(seconds);
  }

  setVolume(vol: number) {
    this.volume.set(vol);
    if (this.audio) {
      this.audio.volume = vol;
    }
  }

  progress = computed(() => {
    if (this.duration() === 0) return 0;
    return (this.currentTime() / this.duration()) * 100;
  });

  next() {
    const playlistLength = this.playlist().length;
    if (playlistLength === 0) return;

    const nextIndex = (this.currentIndex() + 1) % playlistLength;
    this.currentIndex.set(nextIndex);
    const nextTrack = this.playlist()[nextIndex];
    if (nextTrack) {
      this.playTrack(nextTrack);
    }
  }

  previous() {
    const playlistLength = this.playlist().length;
    if (playlistLength === 0) return;

    const prevIndex = (this.currentIndex() - 1 + playlistLength) % playlistLength;
    this.currentIndex.set(prevIndex);
    const prevTrack = this.playlist()[prevIndex];
    if (prevTrack) {
      this.playTrack(prevTrack);
    }
  }
}