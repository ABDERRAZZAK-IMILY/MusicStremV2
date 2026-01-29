import { createReducer, on } from '@ngrx/store';
import { Track } from '../../models/track.model';
import { TrackActions } from './track.actions';

export interface TrackState {
  tracks: Track[];
  loading: boolean;
  error: string | null;
}

export const initialState: TrackState = {
  tracks: [],
  loading: false,
  error: null
};

export const trackReducer = createReducer(
  initialState,
  on(TrackActions.loadTracks, (state) => ({ 
    ...state, loading: true, error: null 
  })),
  on(TrackActions.loadTracksSuccess, (state, { tracks }) => ({ 
    ...state, tracks, loading: false 
  })),
  on(TrackActions.loadTracksFailure, TrackActions.addTrackFailure, (state, { error }) => ({ 
    ...state, error, loading: false 
  })),
  on(TrackActions.addTrackSuccess, (state, { track }) => ({
    ...state, tracks: [...state.tracks, track]
  })),
  on(TrackActions.deleteTrackSuccess, (state, { id }) => ({
    ...state, tracks: state.tracks.filter(t => t.id !== id)
  })),
    on(TrackActions.getTrackById, (state, { id }) => ({
    ...state, tracks: state.tracks.filter(t => t.id !== id)
  }))
);