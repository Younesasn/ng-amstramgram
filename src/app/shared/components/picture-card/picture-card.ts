import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Picture } from '../../interfaces';
import { Bookmark, Heart, LucideAngularModule, MessageCircle, Send } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { PictureApi } from '../../api/picture-api';
import { AuthApi } from '../../api/auth-api';

@Component({
  selector: 'app-picture-card',
  imports: [LucideAngularModule, RouterLink],
  standalone: true,
  templateUrl: './picture-card.html',
})
export class PictureCard implements OnInit {
  readonly picture = input.required<Picture>();
  readonly Heart = Heart;
  readonly Comment = MessageCircle;
  readonly Send = Send;
  readonly Bookmark = Bookmark;
  readonly user = inject(AuthApi).user;
  isLiked = signal<boolean>(false);
  likes = signal<number>(0);
  
  private readonly pictureApi = inject(PictureApi);
  
  ngOnInit() {
    const pic = this.picture();
    if (!pic) return;
    this.likes.set(pic.likes?.length ?? 0);
    const currentUserId = this.user()?.id;
    this.isLiked.set(Boolean(pic.likes?.some((u) => u.id === currentUserId)));
  }

  like() {
    this.pictureApi.likePicture(this.picture().id).subscribe({
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
