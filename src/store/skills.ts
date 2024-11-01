import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SkillsState } from '../TS/store';

const initialState: SkillsState = {
  byId: {},
  allIds: [],
};

export const counterSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    skillRequested: (state) => {},
    skillReceived: (state) => {},
    skillRequestFailed: (state, action: PayloadAction<string>) => {},
  },
});

export default counterSlice.reducer;
