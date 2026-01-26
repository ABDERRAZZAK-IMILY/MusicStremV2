import { Injectable, inject, signal, computed } from '@angular/core';
import { Track } from '../models/track.model';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private storage = inject(StorageService);

  private tracksSignal = signal<Track[]>([]);
  
  isLoading = signal<boolean>(false)
  
  error = signal<string | null>(null);

init() {
  this.loadTracks();
}



    async loadTracks() {
        this.isLoading.set(true);
        this.error.set(null);
        try {
            const tracks = await this.storage.getAll();
            this.tracksSignal.set(tracks);
        }
        catch (err) {
            this.error.set('Failed to load tracks.');
        }
        finally {
            this.isLoading.set(false);
        }
    }

    addTrack(track: Track) {
       
         const supportedTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];

  if (!supportedTypes.includes(track.audioFile.type) || track.audioFile.size > 10 * 1024 * 1024) {

     this.error.set('Audio file must be MP3, WAV, or OGG and less than 10MB in size.');
     return Promise.reject(new Error('Invalid audio file.'));
  }

        return this.storage.add(track).then(() => {
            this.tracksSignal.update(tracks => [...tracks, track]);
        });
    }



    getAllTracks(): Track[] {
        return this.tracksSignal();
    }


    getTrackById(id: string): Track | undefined {
        return this.tracksSignal().find(track => track.id === id);
    }

    removeTrack(id: string) {
        return this.storage.delete(id);
    }

updateTrack(id: string, updatedTrack: Track) {
        this.storage.update(id, updatedTrack);
        this.tracksSignal.update(tracks =>
            tracks.map(t => t.id === id ? updatedTrack : t)
        );

}

}