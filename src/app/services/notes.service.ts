import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Note {
  content: string;
  creation_date: number;
  last_edit: number;
}

@Injectable({ providedIn: 'root' })
export class NotesService {
  private readonly STORAGE_KEY = 'app_notes';
  private currentNoteSubject = new BehaviorSubject<Note | null>(null);
  public currentNote$ = this.currentNoteSubject.asObservable();

  constructor() {
    this.loadNote();
  }

  private loadNote(): Note {
    const savedNote = localStorage.getItem(this.STORAGE_KEY);
    if (savedNote) {
      const parsedNote = JSON.parse(savedNote);
      console.log('Nota caricata:', parsedNote); // Debug
      this.currentNoteSubject.next(parsedNote);
      return parsedNote;
    } else {
      const newNote = this.createNewNote();
      this.currentNoteSubject.next(newNote);
      return newNote;
    }
  }
  

  

  private createNewNote(): Note {  // <-- Specifica il tipo di ritorno
    return {
      content: '',
      creation_date: Date.now(),
      last_edit: Date.now()
    };
  }

  saveNote(content: string, immediate: boolean = false): void {
    const currentNote = this.currentNoteSubject.value || this.createNewNote();
    
    const updatedNote: Note = {
      content: content,
      creation_date: currentNote.creation_date,
      last_edit: Date.now()
    };

    if (immediate) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedNote));
    } else {
      // Salvataggio differito (verrà sovrascritto dalle chiamate successive)
      setTimeout(() => {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedNote));
      }, 5000); // Salva dopo 5 secondi di inattività
    }
    this.currentNoteSubject.next(updatedNote);
  }

  getCurrentNote(): Note | null {
    return this.currentNoteSubject.value;
  }
}
