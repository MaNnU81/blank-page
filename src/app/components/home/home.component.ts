import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { PageContentComponent } from "../page-content/page-content.component";
import { debounceTime } from 'rxjs';
@Component({
  selector: 'app-home',
  template: `
    <app-page-content
      
      (textChanged)="handleTextChange($event)">
    </app-page-content>
  `,
  imports: [PageContentComponent]
})
export class HomeComponent implements OnInit {
  currentNoteContent = '';

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    const savedNote = this.notesService.getCurrentNote();
    if (savedNote?.content) {
      console.log('Contenuto recuperato:', savedNote.content); // Debug
    }
  }

  handleTextChange(text: string): void {
    console.log('Salvo nel service:', text); // Debug
    this.notesService.saveNote(text, false);
}

handleBlur(text: string): void {
  this.notesService.saveNote(text, true); // Salvataggio immediato
}
}