import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="notes-list">
      @if(notes$ | async; as notes){
      @for(note of notes; track note.id){
      <div  class="note-item" (click)="viewNote(note.id ?? 0)">
        <h3>{{ note.title }}</h3>
        <p>{{ note.content | slice: 0:100 }}...</p>
      </div>
      }
      }
    </div>
  `,
  styles: [`
    .notes-list {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .note-item {
      background-color: #cccccc;
      padding: 1rem;
      border-radius: 8px;
      width: 100%;
      max-width: 300px;
      cursor: pointer;
    }
  `],
})
export class NotesListComponent implements OnInit {
  notes$ !: Observable<Note[]>;

  constructor(private noteService: NoteService, private router: Router) { }

  ngOnInit(): void {
    this.notes$ = this.noteService.getAllNotes();
  }

  viewNote(id: number) {
    this.router.navigate(['/notes', id]);
  }

}
