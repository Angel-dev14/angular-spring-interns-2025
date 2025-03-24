import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: ':id',
    component: UserComponent
  }
];
