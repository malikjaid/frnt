import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService);
  routerService = inject(Router);
  isShowMobileMenu: boolean = false;

  doctorLink = [
    {
      label: 'Home',
      link: '/home/patient/dashboard'
    },
    {
      label: 'New Patient',
      link: '/home/patient/patient-create'
    },
    {
      label: 'History',
      link: '/home/patient/patient-history'
    }
  ];
  superAdminLink = [
    {
      label: 'Home',
      link: '/home/organisation/dashboard'
    },
    {
      label: 'Organisation List',
      link: '/home/organisation/organisation-list'
    },
    {
      label: 'Doctor List',
      link: '/home/doctor/doctor-list'
    },
    {
      label: 'Prompt List',
      link: '/home/organisation/prompt-list'
    },
    {
      label: 'Specialization List',
      link: '/home/organisation/specialization-list'
    }
  ]
  organisationLink = [
    {
      label: 'Home',
      link: '/home/doctor/dashboard'
    },
    {
      label: 'Prompt List',
      link: '/home/doctor/prompt-list'
    },
    {
      label: 'Doctor list',
      link: '/home/doctor/doctor-list'
    }
  ];

  ngOnInit() {
    
   }

  hideMobileMenu() {
    this.isShowMobileMenu = false;
  }

  showMobileMenu() {
    this.isShowMobileMenu = true;
  }

  logout() {
    this.authService.logoutUser().subscribe({
      next: (response: any) => {
        if (response) {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('role');
          sessionStorage.removeItem('roleId');
          sessionStorage.removeItem('userData');
          this.routerService.navigateByUrl('/')
        }
      }
    });
  }

  gotoRoute(link: any) {
    const specificRoute = '/home/patient/patient-create';
    if (this.routerService.url === specificRoute && link?.link === specificRoute) {
      window.location.reload();
    } else {
      this.routerService.navigate([link?.link]);
    }
  }

  UserSetting() {
    // const url = this.authService.loginRole.toLowerCase();
    // this.routerService.navigate([`/profile/${url}`]);
  }

}
