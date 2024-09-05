import { Component, Inject, OnInit, Optional, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
interface cnfModelData {
  type: string
  name: string
};

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent implements OnInit {

  private dialogRef = inject(MatDialogRef<ConfirmComponent>, { optional: true });

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public confirmData: cnfModelData) {

  }

  ngOnInit(): void {

  }

  closeModel(value: boolean) {
    this.dialogRef?.close(value);
  }


}
