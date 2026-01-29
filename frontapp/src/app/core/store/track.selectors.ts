import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrackState } from './track.reducer';

export const selectTrackState = createFeatureSelector<TrackState>('tracks');

export const selectAllTracks = createSelector(
  selectTrackState,
  (state: TrackState) => state.tracks
);

export const selectTracksLoading = createSelector(
  selectTrackState,
  (state: TrackState) => state.loading
);

export const selectTracksError = createSelector(
  selectTrackState,
  (state: TrackState) => state.error
);

export const selectTrackById = (trackId: string) => createSelector(
  selectAllTracks,
  (tracks) => tracks.find(t => t.id === trackId)
);