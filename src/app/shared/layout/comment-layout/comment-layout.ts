import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "../../components/header/header";

@Component({
  selector: 'app-comment-layout',
  imports: [RouterOutlet, Header],
  standalone: true,
  templateUrl: './comment-layout.html'
})
export class CommentLayout {

}
