import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthApi } from '../../api/auth-api';
import { CircleUser, House, LogOut, LucideAngularModule, SquarePlus } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './header.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly authApi = inject(AuthApi);
  protected readonly House = House;
  protected readonly SquarePlus = SquarePlus;
  protected readonly Logout = LogOut;
  protected readonly CircleUser = CircleUser;
}
