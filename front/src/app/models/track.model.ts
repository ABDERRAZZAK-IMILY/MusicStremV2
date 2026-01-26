export interface Track {
    id: string;
    title: string;
    artist: string;
    description?: string;
    addedDate: Date;
    duration: number;
    genre: string;
    coverImage?: Blob | string;
    audioFile: Blob;
    audioUrl: string;
    }