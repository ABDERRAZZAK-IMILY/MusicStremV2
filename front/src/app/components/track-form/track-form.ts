import { Component, inject, signal  , Input , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TrackService } from '../../services/track';
import { Track } from '../../models/track.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './track-form.html',
  styleUrl: './track-form.css'
})
export class TrackFormComponent implements OnInit {

  @Input() id?: string;

  isEditMode = signal(false);


  ngOnInit() {
    if (this.id) {
      this.isEditMode.set(true);
      const track = this.trackService.getTrackById(this.id);
      if (track) {
        this.trackForm.patchValue({
          title: track.title,
          description: track.description,
          artist: track.artist,
          genre: track.genre
        });
        this.audioDuration.set(track.duration);
      }
    }
  }

  fb = inject(FormBuilder);

  trackService = inject(TrackService);
  router = inject(Router);

  trackForm = new FormGroup({
    title: this.fb.control('', [Validators.required , Validators.maxLength(50)]),
    description: this.fb.control('', [Validators.maxLength(200)]),
    artist: this.fb.control('', [Validators.required]),
    genre: this.fb.control('', [Validators.required]),
  });

  isSubmitting = signal<boolean>(false);

  audioDuration = signal<number>(0);

  selectedAudioFile : File | null = null;



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
      audioUrl: ''
    };

    const action = this.isEditMode()
      ? this.trackService.updateTrack(this.id!, trackData)
      : this.trackService.addTrack(trackData);

    Promise.resolve(action).then(() => {
      this.isSubmitting.set(false);
      this.router.navigate(['/library']);
    }).catch(() => this.isSubmitting.set(false));
  }


  
}