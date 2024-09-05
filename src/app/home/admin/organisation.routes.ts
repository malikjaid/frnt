import { Routes } from '@angular/router';
import { roleGuard } from '../../shared/guards/role.guard';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path:'dashboard',
        loadComponent:()=>import('./home/home.component').then(m=>m.HomeComponent),
        title:'Home',
        // canActivate:[roleGuard]
    },
    {
        path: 'create-organisation',
        loadComponent: () => import('./create-organisation/create-organisation.component').then(m => m.CreateOrganisationComponent),
        title: 'Create Organisation',
        canActivate:[roleGuard]
    },
    {

        path: 'organisation-list',
        loadComponent: () => import('./organisation-list/organisation-list.component').then(m => m.OrganisationListComponent),
        title: 'Organisation list',
        canActivate:[roleGuard]
    },
    {
        path:'prompt-list',
        loadComponent:() => import('./prompt-list/prompt-list.component').then(m=>m.PromptListComponent),
        title:'Prompt List',
        canActivate:[roleGuard]
    },
    {
        path:'specialization-list',
        loadComponent:() => import('./specialization-list/specialization-list.component').then(m=>m.SpecializationListComponent),
        title:'Specialization List',
        canActivate:[roleGuard]
    },
    {
        path:'create-specialization',
        loadComponent:() => import('./create-specialization/create-specialization.component').then(m=>m.CreateSpecializationComponent),
        title:'Create Specialization',
        canActivate:[roleGuard]
    },
    {
        path:'create-prompt',
        loadComponent:() => import('./create-prompt/create-prompt.component').then(m=>m.CreatePromptComponent),
        title:'Create Prompt',
        canActivate:[roleGuard]
    },
    {
        path:'create-prompt/:id',
        loadComponent:() => import('./create-prompt/create-prompt.component').then(m=>m.CreatePromptComponent),
        title:'Create Prompt',
    }
    // {
    //     path:'home',
    //     loadComponent:()=>import('./patient-details/patient-details.component').then(m=>m.PatientDetailsComponent),
    //     title:'patient details'
    // }
]