import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../home/header/header.component';
import { SharedModule } from '../../../shared.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EncryptionService } from '../../../services/encryption-service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [SharedModule, HeaderComponent],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProfileComponent implements OnInit {
  profileUrls: string = '';
  userData: any;
  BasicInformation!: FormGroup;
  AccountData!: FormGroup;
  userLanguage: any[] = ['English', 'Hindi'];
  constructor(
    private encryptionService: EncryptionService,
    private fb: FormBuilder
  ) {
    this.userData = this.encryptionService.getDecryptedData('userData');
  }
  ngOnInit(): void {
    this.inicialiseForm();
    this.pattchForm();
  }

  onSelectFile(event: any) {
    const file = event?.target?.files;
    if (file && file[0]) {
      const filesAmount = file?.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.profileUrls = event?.target?.result;
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  inicialiseForm() {
    this.BasicInformation = this.fb.group(
      {
        full_name: [''],
        gender: [''],
        birth_date: [''],
        address: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: [''],
      });

    this.AccountData = this.fb.group(
      {
        email: [''],
        phone_number: [''],
        language: ['']
      });
  }

  pattchForm() {
    this.BasicInformation.patchValue({
      full_name: this.userData?.full_name,
      gender: this.userData?.gender,
      birth_date: this.userData?.date_of_birth,
      address: this.userData?.address,
      city: this.userData?.city,
      state: this.userData?.state,
      country: this.userData?.country,
      zipcode: this.userData?.zipcode,
    });
    this.AccountData.patchValue({
      email: this.userData?.email,
      phone_number: this.userData?.phone_number,
      language: this.userData?.language
    });
  }

}
