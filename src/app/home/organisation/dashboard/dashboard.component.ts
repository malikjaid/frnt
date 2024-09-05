import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ChartviewComponent } from '../../../shared/components/chartview/chartview.component';
import { DoctorListComponent } from '../doctor-list/doctor-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule, ChartviewComponent, DoctorListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
