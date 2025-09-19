import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { authGuard } from './shared/auth-guard';
import { DashboardLayout } from './shared/layout/dashboard-layout/dashboard-layout';
import { Profile } from './profile/profile';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayout,
    canActivate: [authGuard],
    children: [
      { path: '', component: Home },
      { path: 'profile/:id', component: Profile },
    ],
  },
  { path: 'login', component: Login },
];
