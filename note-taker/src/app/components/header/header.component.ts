import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AddNoteModalComponent } from '../add-note-modal/add-note-modal.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AddNoteModalComponent, CommonModule],
  template: `
    <header>
      <button *ngIf="showBackButton" (click)="goBack()" class="back-button">Back</button>
      <h1>Note Taker</h1>
      <button (click)="openModal()">Add Note</button>
    </header>
  `,
  styles: [`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: #3f51b5;
      color: white;
    }
    .back-button {
      background-color: #ff4081;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      cursor: pointer;
      border-radius: 5px;
    }
    button {
      background-color: #ff4081;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      cursor: pointer;
      border-radius: 5px;
    }
  `],
})
export class HeaderComponent {
  @ViewChild('addNoteModal') addNoteModal!: AddNoteModalComponent;
  @Input() showBackButton = false;


  constructor(private router: Router, private noteService: NoteService) { }

  openModal() {
    this.noteService.addEditModal.next(null);
  }

  goBack() {
    this.router.navigate(['/']);  // Navigate back to the home page (list of notes)
  }
}