import { createAction, props } from '@ngrx/store';

export const getPublications = createAction('[PAGES] get Publications', props<{texto?: string}>());

export const getPublicationsSuccess = createAction(
  '[PAGES] get Publications Success',
  props<{ data: any }>()
);

export const getUser = createAction('[USER] get User');

export const getUserSuccess = createAction(
  '[USER] get User Success',
  props<{ data: any }>()
);


export const getAllUsers = createAction('[COMMUNITY] get Users', props<{texto?: string}>());

export const getAllUsersSuccess = createAction(
  '[COMMUNITY] get Users Success',
  props<{ data: any }>()
);
