import { ActionReducerMap } from "@ngrx/store";
import { UserReducer, communityData, communityReducer, publicationsReducer } from "./pages/NGRX/pages.reducer";
import { UsersData } from "./interfaces/users.interface";


export interface appState{
  dataPublications: any
  userData: any
  communityData: UsersData[]
}

export const appReducers: ActionReducerMap<appState> = {
  dataPublications: publicationsReducer,
  userData: UserReducer,
  communityData: communityReducer
}
