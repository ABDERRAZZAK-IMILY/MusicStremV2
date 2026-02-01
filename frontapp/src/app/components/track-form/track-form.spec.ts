import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { TrackFormComponent } from './track-form';

describe('TrackForm', () => {
  let component: TrackFormComponent;
  let fixture: ComponentFixture<TrackFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackFormComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideHttpClient(),
        provideStore({})
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});