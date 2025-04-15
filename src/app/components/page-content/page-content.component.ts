import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-content',
  template: `
    <div #editor
         class="editor"
         contenteditable="true"
         (input)="handleInput()">
    </div>
  `,
  styles: [`
    .editor {
      min-height: 200px;
      padding: 1rem;
      border: 1px solid red;
      border-radius: 8px;
    }
  `]
})
export class PageContentComponent implements AfterViewInit {
  @ViewChild('editor') editor!: ElementRef<HTMLElement>;
  @Output() textChanged = new EventEmitter<string>();
  @Output() editorBlur = new EventEmitter<string>();
  @Input() initialContent: string = '';

  ngAfterViewInit(): void {
    if (this.initialContent) {
      this.editor.nativeElement.innerText = this.initialContent;
      console.log('Contenuto inizializzato:', this.initialContent); // Debug
    }
  }

  handleInput(): void {
    const text = this.editor.nativeElement.innerText;
    this.textChanged.emit(text);
  }

  
  public setContent(text: string): void {
    if (this.editor) {
      this.editor.nativeElement.innerText = text;
    }
  }
  
  onBlur(): void {
    this.editorBlur.emit(this.editor.nativeElement.innerText);
  }


  
}

