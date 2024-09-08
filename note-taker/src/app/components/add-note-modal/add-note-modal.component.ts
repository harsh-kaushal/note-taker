// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { NoteService } from '../../services/note.service';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-add-note-modal',
//   standalone: true,
//   imports: [FormsModule],
//   template: `
//     <div class="modal">
//       <h2>{{ isEditMode ? 'Edit' : 'Add' }} Note</h2>
//       <input [(ngModel)]="note.title" placeholder="Title" />
//       <textarea [(ngModel)]="note.content" placeholder="Content"></textarea>
//       <button (click)="saveNote()">Save</button>
//     </div>
//   `,
//   styles: [`
//     .modal {
//       background-color: white;
//       padding: 2rem;
//       border-radius: 10px;
//     }
//   `],
// })
// export class AddNoteModalComponent {
//   note: any = { title: '', content: '' };
//   isEditMode = false;

//   constructor(private noteService: NoteService, private router: Router) { }

//   saveNote() {
//     if (this.isEditMode) {
//       this.noteService.updateNote(this.note.id, this.note).subscribe(() => {
//         this.router.navigate(['/']);
//       });
//     } else {
//       this.noteService.createNote(this.note).subscribe(() => {
//         this.router.navigate(['/']);
//       });
//     }
//   }
// }

// src/app/components/add-note-modal/add-note-modal.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';  // Assuming you have a Note model
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-note-modal',
  imports: [FormsModule],
  templateUrl: './add-note-modal.component.html',
  styles: [`
    .modal-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .modal {
      background-color: white;
      padding: 2rem;
      border-radius: 10px;
      max-width: 400px;
      width: 100%;
    }
    input, textarea {
      display: block;
      width: 100%;
      margin-bottom: 1rem;
    }
    button{
      margin :6px
    }
  `],
  standalone: true,
})
export class AddNoteModalComponent {
  isVisible = false;
  note: Note = { title: '', content: '' };
  isEdit = false;

  @Output() noteAdded = new EventEmitter<void>();

  constructor(private noteService: NoteService) {
    this.noteService.addEditModal.subscribe((res: Note | null) => {
      if (res) {
        this.note = res;
        this.isEdit = true;
      }
      else {
        this.isEdit = false;
        this.note = { title: '', content: '' };
      }
      this.openModal();
    })
  }

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }

  saveNote() {
    this.noteService.createNote(this.note).subscribe(newNote => {
      this.noteAdded.emit();
      this.closeModal();
    });
  }

  updateNote() {
    this.noteService.createNote(this.note).subscribe(newNote => {
      this.closeModal();
    });
  }
}
