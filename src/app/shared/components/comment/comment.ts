import { Component, inject, input, signal, effect } from '@angular/core';
import { PictureApi } from '../../api/picture-api';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {
  Bookmark,
  Heart,
  LucideAngularModule,
  MessageCircle,
  Send,
  Smile,
  X,
} from 'lucide-angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentApi } from '../../api/comment-api';
import { Location } from '@angular/common';
import { AuthApi } from '../../api/auth-api';

@Component({
  selector: 'app-comment',
  imports: [LucideAngularModule, RouterLink, ReactiveFormsModule],
  standalone: true,
  templateUrl: './comment.html',
})
export class Comment {
  readonly id = input.required<string>();
  private readonly pictureApi = inject(PictureApi);
  private readonly commentApi = inject(CommentApi);
  protected readonly picture = this.pictureApi.get(this.id);
  protected readonly comments = this.commentApi.getComments(this.id);
  protected readonly location = inject(Location);
  protected readonly router = inject(Router);
  private readonly history: string[] = [];
  private readonly user = inject(AuthApi).user;
  isLiked = signal<boolean>(false);
  likes = signal<number>(0);
  readonly Heart = Heart;
  readonly Comment = MessageCircle;
  readonly Send = Send;
  readonly Bookmark = Bookmark;
  readonly Smile = Smile;
  readonly Cross = X;

  form: FormGroup = new FormGroup({
    content: new FormControl('', { validators: [Validators.required, Validators.minLength(1)] }),
  });

  constructor() {
    effect(() => {
      const pic = this.picture.value();
      if (!pic) return;
      this.likes.set(pic.likes?.length ?? 0);
      const currentUserId = this.user()?.id;
      this.isLiked.set(Boolean(pic.likes?.some((u) => u.id === currentUserId)));
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  like() {
    if (this.picture.hasValue()) {
      this.pictureApi.likePicture(this.picture.value().id).subscribe({
        next: () => {
          if (!this.isLiked()) {
            this.likes.update((val) => ++val);
          } else {
            this.likes.update((val) => --val);
          }
          this.isLiked.update((val) => !val);
        },
        error: (err) => console.error(err),
      });
    }
  }

  back(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.value.id = Number(this.id());
      const comment = { content: this.form.value.content, picture: { id: Number(this.id()) } };
      console.log(comment);
      this.commentApi.createComment(comment).subscribe({
        next: () => {
          this.comments.reload();
        },
        error: (error) => {
          console.log(error);
        },
      });
      this.form.reset();
    }
  }
}
