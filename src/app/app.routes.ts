import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { AdminProfileComponent } from './shared/components/profile/admin-profile/admin-profile.component';
import { OrgProfileComponent } from './shared/components/profile/org-profile/org-profile.component';
import { DoctorProfileComponent } from './shared/components/profile/doctor-profile/doctor-profile.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
        title: 'login',
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
        title: 'Reset Password',
    },
    {
        path: 'register',
        loadComponent: () => import('./auth/signup/signup.component').then(m => m.SignupComponent),
        title: 'Register',
    },
    {
        path: 'register-doctor',
        loadComponent: () => import('./auth/signup/signup.component').then(m => m.SignupComponent),
        title: 'Doctor registration',
    },
    {
        path: 'register-organization',
        loadComponent: () => import('./auth/signup/signup.component').then(m => m.SignupComponent),
        title: 'Organization registration',
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.routes').then(m => m.routes),
        title: 'home',
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        loadChildren: () => import('./home/home.routes').then(m => [
            {
                path: '',
                redirectTo: 'admin',
                pathMatch: 'full',
            },
            {
                path: 'admin',
                component: AdminProfileComponent,
                title: 'Admin'
            },
            {
                path: 'organization',
                component: OrgProfileComponent,
                title: 'organization'
            },
            {
                path: 'doctor',
                component: DoctorProfileComponent,
                title: 'Doctor'
            }
        ]),
        title: 'Profile',
        canActivate: [authGuard]
    }
];
