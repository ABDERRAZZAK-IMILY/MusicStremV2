import { TestBed } from '@angular/core/testing';

import { AudioPlayerService } from './audio-player';

describe('AudioPlayer', () => {
  let service: AudioPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
