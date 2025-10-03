import { Component, inject, input, computed } from '@angular/core';
import { PictureApi } from '../shared/api/picture-api';
import { RouterLink } from '@angular/router';
import { AuthApi } from '../shared/api/auth-api';
import { LucideAngularModule, SquarePlus } from 'lucide-angular';
import { environment } from '../shared/environments/environment';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, LucideAngularModule],
  standalone: true,
  templateUrl: './profile.html',
})
export class Profile {
  private readonly pictureApi = inject(PictureApi);
  readonly id = input.required<string>();
  protected readonly pictures = this.pictureApi.getPictureByUserId(this.id);
  protected readonly currentUserId = inject(AuthApi).user()?.id;
  protected readonly SquarePlus = SquarePlus;
  readonly isOwner = computed(() => this.currentUserId == Number(this.id()));
  protected readonly totalLikes = computed(() => {
    const content = this.pictures.value()?.content ?? [];
    return content.reduce((total, pic) => total + (pic.likes?.length ?? 0), 0);
  });
  protected readonly apiUrl = environment.apiUrl
}
