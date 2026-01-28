export interface Track {
    id: string;
    title: string;
    artist: string;
    description?: string;
    addedDate: string | Date;
    duration: number;
    genre: string;
    audioFileUrl?: string;
    coverImageUrl?: string;
    audioFile?: File;
    coverImage?: File;
}