import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Register, User } from '../interfaces';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private readonly http = inject(HttpClient);
  user = signal<User | null>(null);
  private readonly router = inject(Router);
  readonly logged = computed(() => this.user() != null);

  constructor() {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user.set(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error(e);
    }
  }

  login({ username, password }: { username: string; password: string }) {
    return this.http
      .get<User>('/api/account', {
        headers: {
          Authorization: 'Basic ' + btoa(username + ':' + password),
        },
        withCredentials: true,
      })
      .pipe(
        tap((user: User) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.user.set(user);
        }),
      );
  }

  register(registerForm: Register) {
    return this.http.post<User>('/api/user', registerForm).pipe(
      tap((user: User) => {
        this.login({ username: user.email, password: registerForm.password });
      }),
    );
  }

  isLogged() {
    return this.logged();
  }

  redirect() {
    if (this.isLogged()) {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.user.set(null);
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
