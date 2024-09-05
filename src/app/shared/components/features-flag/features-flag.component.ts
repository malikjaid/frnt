import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../shared.module';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DoctorService } from '../../services/doctor.service';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-features-flag',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './features-flag.component.html',
  styleUrl: './features-flag.component.scss',
})
export class FeaturesFlagComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<FeaturesFlagComponent>, { optional: true });
  selectedDoctor: any[] = [];
  allDoctors: any[] = [];
  doctorService = inject(DoctorService);
  featuresListing: any[] = [];

  ngOnInit(): void {
    this.loadDoctorsList({ search_key: '' });
    this.loadFeaturesList();
  }

  remove(doctor: string, feature: any): void {
    const index = this.featuresListing.indexOf(feature);
    if (index >= 0) {
      const selectedindex = this.featuresListing[index].selectedDoctor.indexOf(doctor);
      if (selectedindex >= 0) {
        this.featuresListing[index].selectedDoctor.splice(selectedindex, 1);
      }
    }
  }

  selected(event: MatAutocompleteSelectedEvent, feature: any): void {
    const value = event.option.value;
    const index = this.featuresListing.indexOf(feature);
    if (index >= 0) {
      const selectedDoctor = this.featuresListing[index].selectedDoctor;
      if (!selectedDoctor.includes(value)) {
        selectedDoctor.push(value);
      }
    }
  }

  searchDoctors(event: any): void {
    const searchValue = event.target.value.toLowerCase();
    this.loadDoctorsList({ search_key: searchValue });
  }

  closeModel(value: boolean) {
    this.dialogRef?.close(value);
  }

  loadDoctorsList(data: any) {
    const payload = { search_key: data?.search_key, page: 1, per_page: 10, role_id: 2 };
    this.doctorService.retrieveDoctorHistory(payload).pipe(debounceTime(300)).subscribe({
      next: (res: any) => {
        if (res) {
          const list = res?.data;
          if (list.length) {
            this.allDoctors = list;
          } else {
            this.allDoctors = [];
          }
        }
      }
    })
  }

  loadFeaturesList() {
    const payload = { search_key: '', page: 1, per_page: 10, role_id: 2 };
    this.doctorService.getFeatures(payload).subscribe({
      next: (res: any) => {
        if (res) {
          const list = res?.data;
          if (list.length) {
            this.featuresListing = list.map((el: any) => {
              return { ...el, selectedDoctor: [], checked: false };
            });
          } else {
            this.featuresListing = [];
          }
        }
      }
    })
  }

  saveFeatures() {
    const payload = this.featuresListing.map((el: any) => {
      return { feature_id: el?.id, checked: el?.checked, selectedDoctor: el?.selectedDoctor?.map(((d: any) => d?.id)) }
    });
    this.closeModel(true);
  }

  getSlideValue(event: any, value: any) {
    if (event) {
      const index = this.featuresListing.indexOf(value);
      this.featuresListing[index].checked = event.checked;

    }
  }

}
