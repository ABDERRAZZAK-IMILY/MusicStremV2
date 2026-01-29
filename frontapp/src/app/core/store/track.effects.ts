import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { TrackActions } from './track.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Track } from '../../models/track.model';

@Injectable()
export class TrackEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/tracks';

  loadTracks$ = createEffect(() => this.actions$.pipe(
    ofType(TrackActions.loadTracks),
    mergeMap(() => this.http.get<Track[]>(this.apiUrl).pipe(
      map(tracks => TrackActions.loadTracksSuccess({ tracks })),
      catchError(error => of(TrackActions.loadTracksFailure({ error: error.message })))
    ))
  ));

  addTrack$ = createEffect(() => this.actions$.pipe(
    ofType(TrackActions.addTrack),
    mergeMap(({ track, audioFile, coverImage }) => {
      const formData = new FormData();
      formData.append('track', new Blob([JSON.stringify(track)], { type: 'application/json' }));
      formData.append('audioFile', audioFile);
      if (coverImage) formData.append('coverImage', coverImage);

      return this.http.post<Track>(this.apiUrl, formData).pipe(
        map(newTrack => TrackActions.addTrackSuccess({ track: newTrack })),
        catchError(error => of(TrackActions.addTrackFailure({ error: error.message })))
      );
    })
  ));

  deleteTrack$ = createEffect(() => this.actions$.pipe(
    ofType(TrackActions.deleteTrack),
    mergeMap(({ id }) => this.http.delete(`${this.apiUrl}/${id}`).pipe(
      map(() => TrackActions.deleteTrackSuccess({ id })),
      catchError(error => of(TrackActions.loadTracksFailure({ error: error.message })))
    ))
  ));
}