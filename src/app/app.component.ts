import { Component } from '@angular/core';
import { UsersComponent } from './users/users.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  name = 'angular-app';
  show = true;

  toggle() {
    this.show = !this.show;
  }



}
