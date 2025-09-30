import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { Comment } from '../interfaces';

type PostComment = { content: string; picture: { id: number } };

@Injectable({
  providedIn: 'root',
})
export class CommentApi {
  private readonly http = inject(HttpClient);
  getComments(id: Signal<number | string>) {
    return httpResource<Comment[]>(() => '/api/picture/' + id() + '/comment');
  }

  createComment(comment: PostComment) {
    return this.http.post<Comment>('/api/comment', comment);
  }
}
