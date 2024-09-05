import { Injectable, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subject } from 'rxjs';
import { ConfirmComponent } from '../components/confirm/confirm.component';
interface cnfModel {
  type: string
  confirmed: boolean
};

interface cnfModelData {
  type: string
  name: string
};

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  $onCloseConfirm: Subject<cnfModel> = new Subject<cnfModel>;

  loaderMessage = signal<string>('')

  // audio variables
  isRecording: boolean = false;
  audioChunks: any[] = [];
  mediaRecorder!: MediaRecorder;
  audioURL: any;
  modalService = inject(MatDialog);

  showLoader() {
    return this.isLoading.next(true);
  }

  hideLoader() {
    return this.isLoading.next(false);
  }

  get AudioFile() {
    return this.audioURL;
  }

  openAlert(data: cnfModelData) {
    const dialogRef = this.modalService.open(ConfirmComponent, {
      width: '400px',
      height: 'auto',
      data: data,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.$onCloseConfirm.next({ type: data?.type, confirmed: result });
      }
    });
  }


}
