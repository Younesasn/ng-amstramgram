import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { authGuard } from '../auth-guard';
import { DashboardLayout } from './shared/layout/dashboard-layout/dashboard-layout';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayout,
    canActivate: [authGuard],
    children: [{ path: '', component: Home }],
  },
  { path: 'login', component: Login },
];
