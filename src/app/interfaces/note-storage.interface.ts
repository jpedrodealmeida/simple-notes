import { Note } from "./note.interface";

export interface NoteStorage{
    userId: number;
    notes: Note[];
    shared: Note[] | null;
}