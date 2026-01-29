import { Injectable, inject, signal, computed } from '@angular/core';
import { Track } from '../models/track.model';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { TrackActions } from '../core/store/track.actions';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

    private http = inject(HttpClient)

    private store = inject(Store)

    private apiUrl = 'http://localhost:8080/api/tracks';
  
  isLoading = signal<boolean>(false)
  
  error = signal<string | null>(null);

init() {
  this.loadTracks();
}



    async loadTracks() {
        this.isLoading.set(true);
        this.error.set(null);
        try {
            const tracks = await firstValueFrom(this.http.get<Track[]>(this.apiUrl))
            this.store.dispatch(TrackActions.loadTracksSuccess({tracks}))
        }
        catch (err) {
            this.error.set('Failed to load tracks.');
        }
        finally {
            this.isLoading.set(false);
        }
    }



 addTrack(track: Track, audioFile: File, coverImage?: File) {
    const formData = new FormData();
    formData.append('track', new Blob([JSON.stringify(track)], { type: 'application/json' }));
    formData.append('audioFile', audioFile);
    if (coverImage) formData.append('coverImage', coverImage);

    return this.http.post<Track>(this.apiUrl, formData).subscribe({
      next: (newTrack) => this.store.dispatch(TrackActions.addTrackSuccess({ track: newTrack })),
      error: (err) => console.error('Error adding track:', err)
    });
  }


  removeTrack(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => this.store.dispatch(TrackActions.deleteTrackSuccess({ id })),
      error: (err) => console.error('Error deleting track:', err)
    });
  }


 getTrackById(id: string){

    return this.http.get(`${this.apiUrl}/${id}`).subscribe({
      next : () => this.store.dispatch(TrackActions.getTrackById({id})),
      error: (err) => console.error('Error get track:', err)
    })

  }


  updateTrack(id: string, track: Track, audioFile?: File, coverImage?: File) {
  const formData = new FormData();
  formData.append('track', new Blob([JSON.stringify(track)], { type: 'application/json' }));
  if (audioFile) formData.append('audioFile', audioFile);
  if (coverImage) formData.append('coverImage', coverImage);

  return this.http.put<Track>(`${this.apiUrl}/${id}`, formData).subscribe({
    next: (updatedTrack) => this.store.dispatch(TrackActions.loadTracks()),
    error: (err) => console.error('Error updating track:', err)
  });
}



}
