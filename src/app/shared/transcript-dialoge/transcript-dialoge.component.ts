import { Component, Inject } from '@angular/core';
import { SharedModule } from '../shared.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-transcript-dialoge',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './transcript-dialoge.component.html',
  styleUrl: './transcript-dialoge.component.scss'
})
export class TranscriptDialogeComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { data: string | any, modalTitle: string }) {

  }
}
