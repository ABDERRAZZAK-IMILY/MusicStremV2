import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideZonelessChangeDetection } from '@angular/core';
import { TrackService } from './track';

describe('TrackService', () => {
  let service: TrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrackService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideStore({})
      ]
    });
    service = TestBed.inject(TrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});