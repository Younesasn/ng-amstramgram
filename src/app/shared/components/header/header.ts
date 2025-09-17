import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

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
    { path: '', name: 'Créer' },
    { path: 'logout', name: 'Se déconnecter' },
  ]);
}
