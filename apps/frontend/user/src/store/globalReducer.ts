import { createSlice } from '@reduxjs/toolkit';
import LocaleKeys from '@shared/constants/localeKey';
import storageKeys from '@/constants/StorageKeys';
import storageTool from '@shared/utils/storage';

import { useReduxSelector } from '../hooks/reduxHooks';

import reducerNames from './reducerNames';
import { ReduxState } from './reduxStore';

import type { UserInfoType } from '@/features/Auth/types';

export interface GlobalStateType {
  userInfo: UserInfoType;
  globalMenuItems: any[];
  globalRouters: any[];
  locale: string;
}
const initialState: GlobalStateType = {
  userInfo: {
    userName: '',
    userID: '',
  },
  globalMenuItems: [],
  globalRouters: [],
  locale: storageTool.get(storageKeys.I18NKEY) || LocaleKeys['en-US'],
};

const globalReducer = createSlice({
  name: reducerNames.global,
  initialState,
  reducers: {
    setGlobalMenuItems: (state, action) => {
      state.globalMenuItems = action.payload;
    },
    setGlobalRouters: (state, action) => {
      state.globalRouters = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});
export default globalReducer.reducer;

export const { setGlobalMenuItems, setUserInfo, setGlobalRouters } =
  globalReducer.actions;
export const useGlobalState = () => {
  return useReduxSelector(
    (state: ReduxState) => state?.global ?? {},
  ) as GlobalStateType;
};
