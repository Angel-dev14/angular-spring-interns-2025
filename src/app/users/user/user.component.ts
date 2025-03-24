import { Component, inject, OnInit } from '@angular/core';
import { FetchDataService } from '../../api/fetch-data.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  readonly #userService = inject(FetchDataService);
  readonly #route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.#route.snapshot.paramMap.get('id')!;
    console.log(id);

    this.#userService.getUserDetails(+id).pipe(
      tap((response) => console.log(response)),
      switchMap(response => this.#userService.getRoleDetails(response.roleId))
    ).subscribe((response) => {
      console.log(response);
    })
  }

}
