import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { authGuard } from './shared/auth-guard';
import { DashboardLayout } from './shared/layout/dashboard-layout/dashboard-layout';
import { Profile } from './profile/profile';
import { Register } from './register/register';
import { CommentLayout } from './shared/layout/comment-layout/comment-layout';
import { Comment } from './shared/components/comment/comment';

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
  {
    path: 'post',
    component: CommentLayout,
    canActivate: [authGuard],
    children: [
      { path: ':id', component: Comment },
    ],
  },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
];
