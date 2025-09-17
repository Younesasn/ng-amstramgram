import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApi } from '../shared/api/auth-api';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.html',
})
export class Login {
  private readonly router = inject(Router);
  private readonly authApi = inject(AuthApi);

  form: FormGroup = new FormGroup({
    username: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(4)] }),
  });

  constructor() {
    if (this.authApi.isLogged()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.authApi.login(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
