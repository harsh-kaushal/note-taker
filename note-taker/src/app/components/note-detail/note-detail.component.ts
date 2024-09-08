import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [],
  template: `
  @if(note){
    <div>
      <h2>{{ note.title }}</h2>
      <p>{{ note.content }}</p>
      <button (click)="editNote()">Edit</button>
      <button (click)="deleteNote()">Delete</button>
    </div>
    }
  `,
  styles: [`
    div {
      padding: 1rem;
      background-color: #cccccc;
    }
    button {
      margin-right: 0.5rem;
    }
  `],
})
export class NoteDetailComponent implements OnInit {
  note: any;

  constructor(private route: ActivatedRoute, private noteService: NoteService, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    id && this.noteService.getNoteById(Number(id)).subscribe(data => {
      this.note = data;
    });
  }

  editNote() {
    // Redirect to edit page or open a modal for editing
    this.noteService.addEditModal.next(this.note);
  }

  deleteNote() {
    const id = this.route.snapshot.paramMap.get('id');
    this.noteService.deleteNote(Number(id)).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}