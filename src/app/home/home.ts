import { Component, inject, input } from '@angular/core';
import { PictureApi } from '../shared/api/picture-api';
import { PictureCard } from '../shared/components/picture-card/picture-card';
import { Pagination } from '../shared/components/pagination/pagination';

@Component({
  selector: 'app-home',
  imports: [PictureCard, Pagination],
  standalone: true,
  templateUrl: './home.html',
})
export class Home {
  private readonly pictureApi = inject(PictureApi);
  readonly pageNumber = input(1, { transform: (n) => (n ? Number(n) : 1) });
  protected readonly pictures = this.pictureApi.getAll(this.pageNumber);
}
