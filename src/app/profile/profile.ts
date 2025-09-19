import { Component, inject, input } from '@angular/core';
import { PictureApi } from '../shared/api/picture-api';

@Component({
  selector: 'app-profile',
  imports: [],
  standalone: true,
  templateUrl: './profile.html',
})
export class Profile {
  private readonly pictureApi = inject(PictureApi);
  readonly id = input<string>();
  protected readonly pictures = this.pictureApi.getPictureByUserId(this.id() ?? 2);
}
