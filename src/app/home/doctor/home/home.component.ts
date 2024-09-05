import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ChartviewComponent } from '../../../shared/components/chartview/chartview.component';
import { PatientHistoryComponent } from '../patient-history/patient-history.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, ChartviewComponent, PatientHistoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
