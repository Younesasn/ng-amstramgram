import { Component, input } from '@angular/core';
import { Picture } from '../../interfaces';
import { Bookmark, Heart, LucideAngularModule, MessageCircle, Send } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-picture-card',
  imports: [LucideAngularModule, RouterLink],
  standalone: true,
  templateUrl: './picture-card.html',
})
export class PictureCard {
  readonly picture = input.required<Picture>();
  readonly Heart = Heart;
  readonly Comment = MessageCircle;
  readonly Send = Send;
  readonly Bookmark = Bookmark;
}
