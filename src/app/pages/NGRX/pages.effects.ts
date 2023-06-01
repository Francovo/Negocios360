import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap} from 'rxjs';
import { map, tap} from 'rxjs/operators';
import { PublicationsService } from 'src/app/services/publications.service';
import { getAllUsers, getAllUsersSuccess, getPublications, getPublicationsSuccess, getUser, getUserSuccess } from './pages.actions';
import { UsersService } from 'src/app/services/users.service';

@Injectable()
export class PublicationsEffects {
  loadPublications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPublications),
      switchMap(({ texto }) => this.publicationsService.getPublications(texto)),
      map((data) => getPublicationsSuccess({ data })),
    )
  );

  constructor(
    private actions$: Actions,
    private publicationsService: PublicationsService
  ) {}
}

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUser),
      switchMap(() => this.usersService.getProfile()),
      map((data: any) => getUserSuccess( {data} )),
    )
  );

  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) {}
}

@Injectable()
export class CommunityEffects {
  loadAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllUsers),
      switchMap(({ texto }) => this.usersService.getUsersCommunity(texto)),
      map((data: any) => getAllUsersSuccess( {data} )),
    )
  );

  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) {}
}
