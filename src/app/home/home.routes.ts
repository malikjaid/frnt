import { Routes } from '@angular/router';
export const routes: Routes = [

    {
        path: '',
        loadComponent: () => import('./home.component').then(m => m.HomeComponent),
        children: [
            {
                path: '',
                redirectTo: 'patient-create',
                pathMatch: 'full',
            },
            {
                path: 'patient',
                loadChildren: () => import('./doctor/patient.routes').then(m => m.routes)
            },
            {
                path: 'doctor',
                loadChildren: () => import('./organisation/doctor.routes').then(m => m.routes)
            },
            {
                path: 'organisation',
                loadChildren: () => import('./admin/organisation.routes').then(m => m.routes),
            }
        ]
    },
]