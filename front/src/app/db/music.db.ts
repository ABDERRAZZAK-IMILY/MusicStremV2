import Dexie from 'dexie';
import { Track } from '../models/track.model';

export class MusicDatabase extends Dexie {
    tracks: Dexie.Table<Track, string>;
    
    constructor() {
        super('MusicDatabase');
        this.version(1).stores({
            tracks: 'id, title, artist, addedDate, genre'
        });
        this.tracks = this.table('tracks');
    }
}

export const db = new MusicDatabase();