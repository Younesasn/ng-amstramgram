import { Component, inject, input } from '@angular/core';
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
  private history: string[] = [];

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
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
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
