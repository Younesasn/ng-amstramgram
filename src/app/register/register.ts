import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthApi } from '../shared/api/auth-api';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './register.html',
})
export class Register {
  private readonly router = inject(Router);
  private readonly authApi = inject(AuthApi);
  confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (control.value.password !== control.value.confirmPassword) {
      control.get('confirmPassword')?.setErrors({ PasswordNoRepeat: true });
    }
    return null;
  };
  form: FormGroup = new FormGroup(
    {
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      displayName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(4)],
      }),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(4)] }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(4)],
      }),
    },
    { validators: this.confirmPasswordValidator },
  );

  constructor() {
    this.authApi.redirect();
  }

  onSubmit() {
    if (this.form.valid) {
      this.authApi.register(this.form.value).subscribe({
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
