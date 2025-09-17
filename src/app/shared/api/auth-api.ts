import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private readonly http = inject(HttpClient);
  protected user = signal<User | null>(null);

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
}
