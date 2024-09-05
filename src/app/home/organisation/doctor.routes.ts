import { Routes } from "@angular/router";
import { roleGuard } from "../../shared/guards/role.guard";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Home',
    },
    {
        path: 'create-doctor',
        loadComponent: () => import('./create-doctor/create-doctor.component').then(m => m.CreateDoctorComponent),
        title: 'Create Doctor',
        canActivate:[roleGuard]
    },
    {
        path: 'doctor-list',
        loadComponent: () => import('./doctor-list/doctor-list.component').then(m => m.DoctorListComponent),
        title: 'Doctor List',
        canActivate:[roleGuard]
    },
    {
        path: 'doctor-list/:id',
        loadComponent: () => import('./doctor-list/doctor-list.component').then(m => m.DoctorListComponent),
        title: 'Doctor List',
    },
    {
        path:'prompt-list',
        loadComponent:() => import('../admin/prompt-list/prompt-list.component').then(m=>m.PromptListComponent),
        title:'Prompt List',
        canActivate:[roleGuard]
    },
];
