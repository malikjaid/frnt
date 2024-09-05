import { Routes } from "@angular/router";
import { roleGuard } from "../../shared/guards/role.guard";

export const routes : Routes = [
    {
        path:'',
        redirectTo:'dashboard',
        pathMatch:'full'
    },
    {
        path:'dashboard',
        loadComponent:() => import('./home/home.component').then(m=>m.HomeComponent),
        title:'Home',
    },
    {
        path: 'patient-create',
        loadComponent: () => import('./create-patient/create-patient.component').then(m => m.PatientDetailsComponent),
        title: 'Create Patient',
        canActivate:[roleGuard]
    },
    {
        path: 'patient-history',
        loadComponent: () => import('./patient-history/patient-history.component').then(m => m.PatientHistoryComponent),
        title: 'History',
        canActivate:[roleGuard]
    },
    {
        path: 'patient-history/:id',
        loadComponent: () => import('./patient-history/patient-history.component').then(m => m.PatientHistoryComponent),
        title: 'History',
    },
    {
        path:'patient-details/:id',
        loadComponent:() => import('./patient-details/patient-details.component').then(m=>m.PatientDetailsComponent),
        title:'Patient Details'
    }
]