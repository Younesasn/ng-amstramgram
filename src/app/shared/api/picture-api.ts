import { httpResource } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { Comment, Page, Picture } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PictureApi {
  getAll(page?: Signal<number>) {
    return httpResource<Page<Picture>>(() => {
      const params: any = {
        pageNumber: page ? page() - 1 : 0,
      };
      return {
        url: '/api/picture',
        params,
      };
    });
  }

  get(id: string | number) {
    return httpResource<Page<Picture>>(() => '/api/picture/' + id);
  }

  getComment(id: string | number) {
    return httpResource<Comment[]>(() => '/api/picture/' + id + '/comment');
  }

  getPictureByUserId(id: string | number) {
    return httpResource<Picture[]>(() => '/api/picture/user/' + id);
  }
}
