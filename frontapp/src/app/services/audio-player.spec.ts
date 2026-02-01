import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { AudioPlayerService } from './audio-player';

describe('AudioPlayer', () => {
  let service: AudioPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AudioPlayerService,
        provideZonelessChangeDetection()
      ]
    });
    service = TestBed.inject(AudioPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});