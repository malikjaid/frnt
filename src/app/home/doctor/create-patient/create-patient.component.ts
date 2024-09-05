import { ChangeDetectorRef, Component, ElementRef, Renderer2, TemplateRef, ViewChild, inject, viewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonService } from '../../../shared/services/common.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../../shared/services/patient.service';
import { catchError, elementAt, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { GenerateCodes, GenericResponse, GenrateSummaryPayload, HistoryPayload, TrnascriptPayload } from '../../../shared/modal/payload.modal';
import { DecimalPipe, NgClass } from '@angular/common';
import { numNotAllowed, spaceNotAllowed, speCharNotAllowed, speCharNotAllowedWithoutDash } from '../../../shared/Validators/Validators';
import { MatRadioChange } from '@angular/material/radio';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddCodesComponent } from '../../../shared/components/add-codes/add-codes.component';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-patient.component.html',
  styleUrl: './create-patient.component.scss',
})
export class PatientDetailsComponent {
  commonService = inject(CommonService);
  changeDet = inject(ChangeDetectorRef);
  patientService = inject(PatientService);
  toasterService = inject(ToastrService)
  modalService = inject(MatDialog);
  render2 = inject(Renderer2)
  isRecording: boolean = false;
  isPaused: boolean = false;
  isStop: boolean = false;
  isAudioRecorded: boolean = false;
  isUploadFile: boolean = false;
  isGenerate: boolean = true;
  isGenerateSummary: boolean = true;
  isEditable: boolean = true;
  isTranscriptDisable: boolean = true;
  isGenerateTranscript: boolean = false;
  isDelete: boolean = false;
  isLoading: boolean = false;
  audioChunks: any[] = [];
  mediaRecorder!: MediaRecorder;
  audioURL: any = '';
  newText: string = '';
  uplodedFile!: File | null;
  stream!: MediaStream;
  promptTemplate!: Array<any>;
  patientId!: number;
  citation!: Array<{ start: string, text: string }>;
  factualError!: Array<{ error: string, correction: string }>;
  grammaticalError!: Array<{ error: string, correction: string }>;
  medTermError!: Array<{ error: string, correction: string }>;
  transcriptValue: string = "";
  factualErrorStates!: boolean[];
  grammaticalErrorStates!: boolean[];
  medTermErrorStates!: boolean[];
  isContentEditable: boolean = false;
  optimizedTranscriptValue: string = ''
  typingSpeed: number = 10;
  loop: boolean = true;
  uploadedFileUrl: any;
  userSelectedTranscript!: string;

  private currentIndex: number = 0;
  private currentText: string = '';
  private isDeleting: boolean = false;
  CPTCodes: [] = [];
  ICDCodes: [] = [];

  tableColumn = ['Sr no', 'Code', 'Description', 'Action', 'Review']
  transcriptArray: string[] = [];

  patientDetailsForm!: FormGroup;

  pagination: HistoryPayload = {
    search_key: '',
    search_column: '',
    // order:'',
    // order_by:'',
    page: 1,
    per_page: 10,
  }

  timer: any;
  elapsedTime: number = 0;

  fileOptions = [
    {
      value: '1',
      label: 'Record Audio'
    },
    {
      value: '2',
      label: 'Upload File'
    }
  ]

  accessibleFeature:any = {}


  @ViewChild('citationsModal', { static: true }) citationsModal!: TemplateRef<any>;
  @ViewChild('uploadControl') uploadControl!: ElementRef<any>;
  @ViewChild('summaryControl') summaryControl!: ElementRef<any>;

  ngOnInit() {
    this.initForm();
    this.retrievePromptList();
    this.generateCodes();
    this.getFeatureList();
  }

  initForm() {
    this.patientDetailsForm = new FormGroup({
      patientName: new FormControl('', [Validators.required, numNotAllowed, speCharNotAllowed]),
      patientId: new FormControl('', [Validators.required, spaceNotAllowed, Validators.maxLength(100)]),
      audioFile: new FormControl(),
      audioOption: new FormControl('1'),
      patientType: new FormControl('1', [Validators.required]),
      promptId: new FormControl(1, [Validators.required]),
      optimizedtranscript: new FormControl(''),
      summary: new FormControl(''),
      validChoice: new FormControl(''),
      chooseTranscript:new FormControl('')
    })
  }


  getFeatureList(){
    const doctorId = sessionStorage.getItem('doctorId')!;
    if(doctorId){
      this.patientService.getFeaturesList(doctorId).pipe().subscribe({
        next:(response:any)=>{
          if(response){
            this.accessibleFeature = response?.data;
          }
        }
      })
    }
  }





  retrievePromptList() {
    const payload = { ...this.pagination, type: 1 }
    this.patientService.getPromptData(payload).pipe().subscribe({
      next: (response: any) => {
        if (response.data.length) {
          this.promptTemplate = response.data;
        }
      }
    })
  }

  enableOptions(event: MatRadioChange) {
    this.uplodedFile = null;
    this.audioURL = '';
    this.isRecording = false;
    this.isStop = false;
    this.patientDetailsForm.get('audioFile')?.setValue('');
    event.value === '2' ? this.isUploadFile = true : this.isUploadFile = false
    // if(event)
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.isGenerate = false;
    const maxSizeInBytes = 25 * 1024 * 1024; // 25 MB;
    const fileReader = new FileReader();
    if (file.size > maxSizeInBytes) {
      this.toasterService.error("File size exceeds 25 MB");
      this.deleteUploadedFile();
    } else {
      this.uplodedFile = file;
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        this.uploadedFileUrl = event.target?.result;
      }
      this.patientDetailsForm.get('audioFile')?.setValue(this.uplodedFile);
    }
  }
  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.stream = stream;
      this.mediaRecorder = new MediaRecorder(stream);
      this.isRecording = true;
      this.isAudioRecorded = false;
      this.audioChunks = [];
      this.elapsedTime = 0;


      this.mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/mpeg' });
        this.audioURL = URL.createObjectURL(audioBlob);
        this.isAudioRecorded = true;
        this.isGenerate = false;
        this.changeDet.detectChanges();
        this.convertAudioToMp3(audioBlob);
        clearInterval(this.timer);
      };

      this.mediaRecorder.start();
      this.startTimer();
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.mediaRecorder.stop();
      this.stream.getTracks().forEach(track => track.stop()); // Stop all audio tracks
      this.isStop = true;
      this.isPaused = false;
      this.changeDet.detectChanges();
      clearInterval(this.timer);
    }
  }

  pauseRecording() {
    if (this.isRecording && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.pause();
      this.stream.getTracks().forEach(track => track.enabled = false); // Disable all audio tracks
      this.isPaused = true;
      this.changeDet.detectChanges();
      clearInterval(this.timer);
    }
  }

  resumeRecording() {
    if (this.isRecording && this.mediaRecorder.state === 'paused') {
      this.stream.getTracks().forEach(track => track.enabled = true); // Enable all audio tracks
      this.mediaRecorder.resume();
      this.isPaused = false;
      this.changeDet.detectChanges();
      this.startTimer();
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.elapsedTime++;
      this.changeDet.detectChanges();
    }, 1000);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${this.pad(minutes)}:${this.pad(secs)}`;
  }

  pad(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }


  convertAudioToMp3(blobData: Blob) {
    const audioFile = new File([blobData], 'recording.mp3', { type: 'audio/webm' });
    this.patientDetailsForm.get('audioFile')?.setValue(blobData);
    this.changeDet.detectChanges();
  }



  submitPatientDetails() {
    if (this.audioURL || this.uplodedFile) {
      if (this.patientDetailsForm.valid) {
        this.isDelete = true;
        if(this.fileOptions.length > 1){
          if (this.audioURL) {
            this.fileOptions.splice(1, 1)
          } else if (this.uplodedFile) {
            this.fileOptions.splice(0, 1)
          }
        }
        this.transcriptArray = [];
        this.patientDetailsForm.get("transcript")?.reset()
        const payload = {
          patientName: this.patientDetailsForm.get('patientName')?.value,
          patientId: this.patientDetailsForm.get('patientId')?.value,
          audioFile: this.patientDetailsForm.get('audioFile')?.value || this.uplodedFile,
          type_id: this.patientDetailsForm.get('patientType')?.value,
          promptId: this.patientDetailsForm.get('promptId')?.value
        };
        this.commonService.loaderMessage.set('Loading...');
        this.isGenerateTranscript = true;
        this.patientService.createPatient(payload).subscribe({
          next: (response: any) => {
            if (response) {
              const data = response;
              if (data.status === 200) {
                this.currentIndex = 0
                this.patientDetailsForm.get('transcript')?.setValue('');
                this.transcriptArray = data.data.transcript.split(' ');
                this.patientId = data.data.id;
                this.citation = JSON.parse(data?.data?.citation);
                this.typingAnimation();
                this.optimizeTranscript(this.patientId);
              } else {
                this.toasterService.error('Error: ' + (data.message || 'An unexpected error occurred'));
              }
            }
          },
          error: (err) => { 
            this.toasterService.success(err?.error?.message);
          },
          complete: () => {
            this.commonService.loaderMessage.set('');
          }
        });
      } else {
        this.patientDetailsForm.markAllAsTouched();
        this.patientDetailsForm.markAsDirty();
        this.toasterService.error('Please fill out the form correctly before submitting.');
      }
    } else {
      this.toasterService.error("Audio File is Required")
    }

  }

  generateSummary() {
    this.commonService.loaderMessage.set('Generating Summary')
    const transcriptValue = document.querySelector('.original-transcript')!.textContent!;
    if (this.patientDetailsForm.valid && transcriptValue) {
      const payload: GenrateSummaryPayload = {
        patient_id: this.patientId ? this.patientId : 0,
        transcript: transcriptValue,
        is_edited: this.isEditable,
        prompt_id: this.patientDetailsForm.get('promptId')?.value,
        selected_transcript_type: this.patientDetailsForm.get('chooseTranscript')?.value
      };
      this.patientService.generateSummary(payload).subscribe({
        next: (response: any) => {
          if (response) {
            this.patientDetailsForm.get('summary')?.setValue(response?.data?.summary)
            // this.summaryControl.nativeElement.innerText = response?.data?.summary;
            // this.render2.addClass(this.summaryControl.nativeElement, 'summaryControl')
          }
        },
        error: (err) => { 
          this.toasterService.success(err?.error?.message);
          this.commonService.loaderMessage.set('');
        },
        complete: () => {
          this.isGenerateSummary = true;
          this.commonService.loaderMessage.set('');
          this.generateCodes();
        }
      });
    } else {
      this.toasterService.error('Transcript is empty ')
    }

  }

  typingAnimation() {
    this.isGenerate = true;
    if (this.transcriptArray.length) {
      const currentIndex = this.currentIndex % this.transcriptArray.length;
      const fullText = this.transcriptArray[currentIndex];
      if (this.currentIndex >= this.transcriptArray.length) {
        // this.isGenerateSummary = false;
        this.isEditable = false;
        this.isTranscriptDisable = false;
        this.transcriptArray = [];
        this.currentText = ''
        return;
      }
      this.currentIndex++;
      this.currentText += fullText + ' ';
      this.transcriptValue = this.currentText
      this.isContentEditable = true;
      // this.patientDetailsForm.get('transcript')?.setValue(this.currentText);
      setTimeout(() => {
        this.typingAnimation();
      }, this.typingSpeed);
    }
  }

  deleteRecording() {
    this.audioURL = null;
    this.audioChunks = [];
    this.isStop = false;
    this.isPaused = false;
    this.patientDetailsForm.get('audioFile')?.setValue('');
    this.changeDet.detectChanges();
  }

  deleteUploadedFile() {
    this.uploadedFileUrl = null;
  }

  optimizeTranscript(patientId: number) {
    this.isLoading = true;
    const payload = {
      patient_id: patientId
    }
    this.patientService.optimiseTranscript(payload).subscribe({
      next: (response: any) => {
        if (response) {
          this.isLoading = false;
          try {
            const paresedJson = JSON.parse(response?.data?.optimize_transcript);
            if (paresedJson) {
              console.log(paresedJson)
              try {
                const errorCodes = paresedJson['JSONText:'] || paresedJson?.JSONText;
                this.factualError = errorCodes?.factual;
                this.factualErrorStates = new Array(this.factualError.length).fill(false)
                this.grammaticalError = errorCodes?.grammatical;
                this.grammaticalErrorStates = new Array(this.grammaticalError.length).fill(false)
                this.medTermError = errorCodes?.medTerm;
                this.medTermErrorStates = new Array(this.medTermError.length).fill(false);
                this.optimizedTranscriptValue = this.highlightErrors();
                  
                } catch (error) {
                  this.optimizedTranscriptValue = this.transcriptValue;
                }
            }else{
              this.optimizedTranscriptValue = this.transcriptValue;
            }
          } catch (error) {
              this.optimizedTranscriptValue =  this.transcriptValue;
          }
          
        }
      },error: (err) => { 
        this.toasterService.success(err?.error?.message);
        this.commonService.loaderMessage.set('');
        this.isLoading = false;
        this.optimizedTranscriptValue  = this.transcriptValue
      },
    });
  }

  get transcriptChoice() {
    return this.patientDetailsForm.get('chooseTranscript')?.value
  }



  copyToClipBoard(controlValue: string) {
    let value;
    if (controlValue === 'transcript') {
      value = document.querySelector('.original-transcript')!.textContent!;
    } else {
      value = this.patientDetailsForm.get(controlValue)?.value
    }
    if (value) {
      navigator.clipboard.writeText(value).then(() => {
        this.toasterService.success("Copied")
      }).catch((error) => {
        this.toasterService.error("Failed to Copy");
      })
    } else {
      this.toasterService.error("No Value to copy")
    }
  }

  selectTranscript(radioControl: MatRadioChange) {
    if (radioControl.value === '1') {
      const value  = document.querySelector('.original-transcript')?.textContent!;
      if(value){
        this.userSelectedTranscript = value;
      }
    }else{
      const value  = document.querySelector('.optimized-transcript')?.textContent!;
      if(value){
        this.userSelectedTranscript = value;
      }
    }
    this.isGenerateSummary = false;
  }

  copySummary() {
    const value = this.summaryControl.nativeElement.innerText;
    if (value) {
      navigator.clipboard.writeText(value).then(() => {
        this.toasterService.success("Copied")
      }).catch((error) => {
        this.toasterService.error("Failed to Copy");
      })
    } else {
      this.toasterService.error("No Value to copy")
    }
  }

  showCitations() {
    this.modalService.open(this.citationsModal, {
      width: '600px'
    });
  }


  generateCodes() {
    if (this.patientId) {
      const payload = {
        patient_id: this.patientId
      }
      this.patientService.generateCode(payload).subscribe({
        next: (response: any) => {
          if (response) {
            const data = response as GenerateCodes;
            if (data.status === 200) {
              this.ICDCodes = data.data.mcd_code.filter((code: any) => code.type === 'icd')
              this.CPTCodes = data.data.mcd_code.filter((code: any) => code.type === 'cpt')
            }
          }
        },
        error: (err) => { 
          this.toasterService.success(err?.error?.message);
          this.commonService.loaderMessage.set('');
        },
      });
    }
  }

  sendCodeReview(patientId: string, event: MatRadioChange) {
    const selectedValue = event.value;
    if (selectedValue && patientId) {
      const payload = {
        id: patientId,
        data: selectedValue,
        type: ''
      }
      this.patientService.reviewPatient(payload).pipe().subscribe({
        next: (response: any) => {
          if (response && response?.status === 200) {
          }
        }
      })
    }
  }


  sendCodeReviewType(patientId: string, event: any) {
    const review = event.target.value;
    if (review && patientId) {
      const payload = {
        id: patientId,
        data: review,
        type: 'review'
      }
      this.patientService.reviewPatient(payload).pipe().subscribe({
        next: (response: any) => {
          if (response && response?.status === 200) {
          }
        }
      })
    }
  }

  addNewCodes(codeType: string) {
    const modalRef = this.modalService.open(AddCodesComponent, {
      maxWidth: '700px',
      data: {
        patientId: this.patientId,
        codeType: codeType
      }
    });
  }


  toggleCorrection(index: number, type: string) {
    switch (type) {
      case 'factualError':
        this.factualErrorStates[index] = !this.factualErrorStates[index];
        if (this.factualErrorStates[index]) {
          this.applyCorrection(this.factualError[index].error, this.factualError[index].correction);
        } else {
          this.undoChange(this.factualError[index].correction, this.factualError[index].error);
        }
        break;
      case 'grammaticalError':
        this.grammaticalErrorStates[index] = !this.grammaticalErrorStates[index];
        if (this.grammaticalErrorStates[index]) {
          this.applyCorrection(this.grammaticalError[index].error, this.grammaticalError[index].correction);
        } else {
          this.undoChange(this.grammaticalError[index].correction, this.grammaticalError[index].error);
        }
        break;
      case 'medTermError':
        this.medTermErrorStates[index] = !this.medTermErrorStates[index];
        if (this.medTermErrorStates[index]) {
          this.applyCorrection(this.medTermError[index].error, this.medTermError[index].correction);
        } else {
          this.undoChange(this.medTermError[index].correction, this.medTermError[index].error);
        }
        break;
    }
  }
  applyCorrection(error: string, correction: string) {
    this.transcriptValue = this.transcriptValue.replace(`<span class="error-highlight">${error}</span>`, `<span class="fix-highlight">${correction}</span>`);
  }

  undoChange(correction: string, error: string) {
    this.transcriptValue = this.transcriptValue.replace(`<span class="fix-highlight">${correction}</span>`, `<span class="error-highlight">${error}</span>`)
  }


  highlightErrors() {
    let highlightedTranscription = this.transcriptValue;

    // Highlight factual errors
    [...this.factualError, ...this.grammaticalError, ...this.medTermError].forEach((item, index) => {
      highlightedTranscription = highlightedTranscription.replace(item.error, `<span class="error-highlight error-at-${index}">${item.correction} </span>`);
    });

    setTimeout(() => {
      [...this.factualError, ...this.grammaticalError, ...this.medTermError].forEach((item, index) => {
          const targetDiv = document.querySelector(`.error-highlight.error-at-${index}`);
          if (targetDiv) {
              targetDiv.addEventListener('mouseover', (event) => this.showTooltip(event, item));
              targetDiv.addEventListener('mouseout', this.hideTooltip);
          }
      });
  },2000);
    return highlightedTranscription;
  }

  showTooltip(event:any, item:any) {
    const tooltip = document.createElement('div');
    tooltip.classList.add('hover-box');
    tooltip.innerHTML = `<span class="error">${item.error}</span> <span class="correction">${item.correction}</span>`;
    document.body.appendChild(tooltip);

    const { clientX: mouseX, clientY: mouseY } = event;
    tooltip.style.top = `${mouseY + 5}px`;
    tooltip.style.left = `${mouseX + 5}px`;

    event.target.tooltip = tooltip;
}

hideTooltip(event:any) {
    if (event.target.tooltip) {
        document.body.removeChild(event.target.tooltip);
        event.target.tooltip = null;
    }
}


}


