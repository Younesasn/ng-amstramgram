import { Component, inject } from '@angular/core';
import { PictureApi } from '../shared/api/picture-api';
import { PictureCard } from '../shared/components/picture-card/picture-card';

@Component({
  selector: 'app-home',
  imports: [PictureCard],
  standalone: true,
  templateUrl: './home.html',
})
export class Home {
  private readonly pictureApi = inject(PictureApi);
  protected readonly pictures = this.pictureApi.getAll();
}
