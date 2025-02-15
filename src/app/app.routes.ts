import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(c => c.DashboardComponent),
    canActivate: [AuthGuard] // Apply the guard to this route
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirección a login
];;
