import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FetchDataService } from '../api/fetch-data.service';
import {
  BehaviorSubject, catchError, EMPTY, interval, map, Observable, of, ReplaySubject, Subject, Subscription, takeUntil,
  tap
} from 'rxjs';
import { User } from '../domain/user.interface';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [
    JsonPipe,
    AsyncPipe,
    RouterOutlet
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy {

  readonly #fetchDataService = inject(FetchDataService);

  users: User[] = [];
  loader = true;
  users$!: Observable<User[]>;

  destroySubject$$ = new Subject<void>();
  // usersSignal = signal<User[]>([]);

  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);

  ngOnInit(): void {
    // interval(1000).pipe(
    //   takeUntil(this.destroySubject$$),
    //   tap(() => console.log('something happened'))
    // ).subscribe();

    this.users$ = this.#fetchDataService.getUsers().pipe(
      catchError((err) => {
        console.log('error happened', err);
        return EMPTY;
      })
    );

    // this.#fetchDataService.getUsers().pipe(
    //   tap(() => this.loader$$.next(true)),
    // ).subscribe({
    //   next: (users) => {
    //     this.users = users;
    //   },
    //   error: (err) => {
    //     console.log('err')
    //   },
    //   complete: () => {
    //     console.log('stream has completed')
    //   }
    // });
  }

  navigate(user: User) {
    this.#router.navigate([`/${+user.id}`], {
      relativeTo: this.#route,
    });
  }

  ngOnDestroy(): void {
    this.destroySubject$$.next();
    this.destroySubject$$.complete();
  }

}
