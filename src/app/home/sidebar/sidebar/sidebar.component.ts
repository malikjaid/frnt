import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  authService = inject(AuthService)
  routerService = inject(Router);

  doctorLink = [
    {
      label: 'New Encounter',
      link: '/home/patient/patient-create'
    },
    {
      label: 'History',
      link: '/home/patient/patient-history'
    }
  ];
  superAdminLink = [
    {
      label: 'Create Organisation',
      link: '/home/organisation/create-organisation',
    },
    {
      label: 'Organisation List',
      link: '/home/organisation/organisation-list'
    },
    {
      label: 'Doctor List',
      link: '/home/doctor/doctor-list'
    }
  ]

  organisationLink = [
    {
      label: 'Create Doctor',
      link: '/home/doctor/create-doctor'
    },
    {
      label: 'Doctor list',
      link: '/home/doctor/doctor-list'
    }
  ]

}
