import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { Page, Picture } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PictureApi {
  private readonly http = inject(HttpClient);
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

  get(id: Signal<number | string>) {
    return httpResource<Picture>(() => '/api/picture/' + id());
  }

  getPictureByUserId(id: Signal<number | string>) {
    return httpResource<Page<Picture>>(() => '/api/picture/user/' + id());
  }

  likePicture(id: number) {
    return this.http.patch<Picture>('/api/picture/' + id + '/like', {});
  }

  addPicture(picture: { title: string; description: string; image: string }) {
    return this.http.post<Picture>('/api/picture', picture);
  }

  upload(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<{ filename: string }>('/api/picture/upload', formData);
  }
}
