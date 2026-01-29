import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Track } from '../../models/track.model';

export const TrackActions = createActionGroup({
  source: 'Track API',
  events: {
    'Load Tracks': emptyProps(),
    'Load Tracks Success': props<{ tracks: Track[] }>(),
    'Load Tracks Failure': props<{ error: string }>(),

    'Add Track': props<{ track: Track; audioFile: File; coverImage?: File }>(),
    'Add Track Success': props<{ track: Track }>(),
    'Add Track Failure': props<{ error: string }>(),

    'Delete Track': props<{ id: string }>(),
    'Delete Track Success': props<{ id: string }>(),

    'get Track by id' : props<{id: string}>() ,
    'get Track by id Succes' : props<{id : string}>
  },
});
