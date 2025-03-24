import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { User } from '../domain/user.interface';

const mockUsers: User[] = [
  {
    id: 1,
    username: 'user1',
    email: 'user1@example.com'
  },
  {
    id: 2,
    username: 'user2',
    email: 'user2@example.com'
  },
  {
    id: 3,
    username: 'user3',
    email: 'user3@example.com'
  }
];

const userDetail = {
  name: 'Sorsix',
  age: 10,
  email: 'email@example.com',
  roleId: 10
}

@Injectable({ providedIn: 'root' })
export class FetchDataService {

  readonly #http = inject(HttpClient);

  getUsers(): Observable<any[]> {
    return this.#getUsers().pipe(
    );
  }

  getUserDetails(id: number): Observable<any> {
    return of(userDetail);
  }

  getRoleDetails(roleId: number) {
    return of({
      role: 'Admin',
      permissions: [{
        name: 'Can Manage Users'
      }]
    })
  }

  #getUsers() {
    return of(mockUsers).pipe(
      delay(2000)
    );
  }

}
