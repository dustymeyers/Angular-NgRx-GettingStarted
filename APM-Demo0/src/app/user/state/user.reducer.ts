import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
// import * as AppState from '../../state/app.state';

import { User } from "../user";



export interface UserState {
  maskUserName: boolean;
  currentUser: null
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);

export const userReducer = createReducer<UserState>(
  initialState,
  on(createAction('[User] Mask User Name'), (state): UserState => {
    return {
      ...state,
      maskUserName: !state.maskUserName
    };
  })
);
