import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', loadComponent: () => import('./employee-list/employee-list.component').then(m => m.EmployeeListComponent) },
  { path: 'add-employee', loadComponent: () => import('./employee-form/employee-form.component').then(m => m.EmployeeFormComponent) },
  { path: 'edit-employee/:id', loadComponent: () => import('./employee-form/employee-form.component').then(m => m.EmployeeFormComponent) }
];