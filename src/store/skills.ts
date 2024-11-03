import { createSlice } from '@reduxjs/toolkit';
import type { Action, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { SkillsState } from '../TS/store';
import { AppDispatch, RootState } from './store';
import { apiCall } from './middleware/api';
import { SkillResponse } from '../TS/api';

const initialState: SkillsState = {
  byId: {},
  allIds: [],
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    skillRequested: (skills, action: PayloadAction<{ skillId: string }>) => {
      skills.byId[action.payload.skillId] = 'loading';
    },
    skillReceived: (skills, action: PayloadAction<SkillResponse>) => {
      const skill = action.payload.data.skill;
      skills.byId[skill.id] = {
        id: skill.id,
        name: skill.attributes.name,
      };
      skills.allIds.push(skill.id);
    },
    skillRequestFailed: (skills, action: PayloadAction<string>) => {},
  },
});

const { skillRequested, skillReceived, skillRequestFailed } =
  skillsSlice.actions;

export const loadSkills =
  (skills: { id: string }[]) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    skills.forEach((skill) => {
      dispatch(loadSkill(skill.id));
    });
  };

const skillURL = '/skill/';
export const loadSkill =
  (skillId: string) =>
  (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const skills = getState().skills;

    if (skills.byId[skillId]) return;
    // console.log('calling skills api');
    dispatch(
      apiCall({
        url: skillURL + skillId,
        onStartAction: { type: skillRequested.type, payload: { skillId } },
        onSuccessAction: { type: skillReceived.type },
        onFailedAction: { type: skillRequestFailed.type, payload: { skillId } },
      })
    );
  };
export default skillsSlice.reducer;
