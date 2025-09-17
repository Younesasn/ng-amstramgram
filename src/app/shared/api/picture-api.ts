import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment, Page, Picture } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PictureApi {
  getAll() {
    return httpResource<Page<Picture>>(() => '/api/picture');
  }

  get(id: string | number) {
    return httpResource<Page<Picture>>(() => '/api/picture/' + id);
  }

  getComment(id: string | number) {
    return httpResource<Comment[]>(() => '/api/picture/' + id + '/comment');
  }
}
