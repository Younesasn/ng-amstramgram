import { Component, input } from '@angular/core';
import { Page } from '../../interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './pagination.html',
})
export class Pagination {
  readonly paginated = input.required<Page<any>>();
  readonly pageNumber = input.required<number>();
}
