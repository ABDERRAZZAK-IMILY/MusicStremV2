import { Injectable } from "@angular/core";
import { Track } from "../models/track.model";
import { db } from "../db/music.db";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    

    add(music: Track){
        return db.tracks.add(music);
    }

    getAll(){
        return db.tracks.toArray();
    }

    getById(id: string){
        return db.tracks.get(id);
    }

    delete(id: string){
        return db.tracks.delete(id);
    }


   update(id: string, music: Track) {
    return db.tracks.update(id, music);
}

}