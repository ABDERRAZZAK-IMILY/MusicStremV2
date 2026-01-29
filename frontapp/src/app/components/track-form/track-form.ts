import { Component, inject, signal, Input, OnInit, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { TrackService } from '../../services/track';
import { Track } from '../../models/track.model';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTrackById, selectAllTracks } from '../../core/store/track.selectors';
import { TrackActions } from '../../core/store/track.actions';
import { filter, take } from 'rxjs/operators';

declare const lucide: any;

@Component({
  selector: 'app-track-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './track-form.html',
  styleUrl: './track-form.css'
})
export class TrackFormComponent implements OnInit, AfterViewInit {
  @Input() id?: string;
  isEditMode = signal(false);

  private store = inject(Store);
  private fb = inject(FormBuilder);
  private trackService = inject(TrackService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      lucide.createIcons();
    }
  }

  ngOnInit() {
    if (this.id) {
      this.isEditMode.set(true);

      this.store.dispatch(TrackActions.loadTracks());

      this.store.select(selectTrackById(this.id)).pipe(
        filter((track): track is Track => track !== undefined),
        take(1)
      ).subscribe((track: Track) => {
        this.trackForm.patchValue({
          title: track.title,
          description: track.description,
          artist: track.artist,
          genre: track.genre
        });
        this.audioDuration.set(track.duration);
      });
    }
  }

  trackForm = new FormGroup({
    title: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
    description: this.fb.control('', [Validators.maxLength(200)]),
    artist: this.fb.control('', [Validators.required]),
    genre: this.fb.control('', [Validators.required]),
  });

  isSubmitting = signal<boolean>(false);

  audioDuration = signal<number>(0);

  selectedAudioFile: File | null = null;



  onAudioSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    this.selectedAudioFile = file;

    const audio = new Audio();
    const reader = new FileReader();

    audio.src = URL.createObjectURL(file);
    audio.onloadedmetadata = () => {
      this.audioDuration.set(Math.floor(audio.duration));
      URL.revokeObjectURL(audio.src);
    };
  }

  selectedCoverFile: File | null = null;

  onCoverSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      this.selectedCoverFile = file;
    } else {
      alert('only png and jpeg');
    }
  }



  onSubmit() {
    if (!this.trackForm.valid) return;
    this.isSubmitting.set(true);

    const formValues = this.trackForm.value;


    const trackData: Track = {
      id: this.id || crypto.randomUUID(),
      title: formValues.title || '',
      description: formValues.description || '',
      artist: formValues.artist || '',
      genre: formValues.genre || '',
      audioFile: this.selectedAudioFile!,
      addedDate: new Date(),
      duration: this.audioDuration(),
      coverImage: this.selectedCoverFile || undefined,
    };


    if (this.isEditMode()) {
      this.trackService.updateTrack(this.id!, trackData, this.selectedAudioFile || undefined, this.selectedCoverFile || undefined);
    } else {
      this.trackService.addTrack(trackData, this.selectedAudioFile!, this.selectedCoverFile || undefined);
    }

    this.router.navigate(['/library']);
  }



}