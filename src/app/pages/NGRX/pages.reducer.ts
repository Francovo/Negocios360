import { createReducer, on } from '@ngrx/store';
import { getAllUsersSuccess, getPublicationsSuccess, getUserSuccess } from './pages.actions';
import { UsersData } from 'src/app/interfaces/users.interface';


export const dataPublications: any = [];
export const userData: any = []
export const communityData: UsersData[] = []

export const publicationsReducer = createReducer(
    dataPublications,
    on(getPublicationsSuccess, (state, { data }) => ({
      ...state,
      data
    }))
);


export const UserReducer = createReducer(
  userData,
  on(getUserSuccess, (state, { data }) => ({
    ...state,
    data
  }))
);


export const communityReducer = createReducer(
  communityData,
  on(getAllUsersSuccess, (state, { data }) => ({
    ...state,
    data
  }))
);

