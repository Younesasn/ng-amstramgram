import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthApi } from '../../api/auth-api';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly links = signal([
    { path: '/', name: 'Accueil' },
    { path: 'post/new', name: 'Créer' },
  ]);
  protected readonly authApi = inject(AuthApi);
}
