import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { TrackDetail } from './track-detail';

describe('TrackDetail', () => {
  let component: TrackDetail;
  let fixture: ComponentFixture<TrackDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackDetail],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideHttpClient(),
        provideStore({})
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackDetail);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});