import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-summary-dialoge',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './summary-dialoge.component.html',
  styleUrl: './summary-dialoge.component.scss'
})
export class SummaryDialogeComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:{summary:string}){}

}
