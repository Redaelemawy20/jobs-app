import { Action, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCall } from './middleware/api';
import { JobsState } from '../TS/store';
import { JobsResponse } from '../TS/api';
import { RootState } from './store';

const intialState: JobsState = {
  byId: {},
  allIds: [],
  totalJobs: -1, // intial load
  cursor: 0,
  loading: false,
  error: false,
};
const jobSlice = createSlice({
  name: 'jobs',
  initialState: intialState,
  reducers: {
    jobsRequested: (jobs) => {
      jobs.loading = true;
      jobs.error = false;
    },
    jobsReceived: (jobs, action: PayloadAction<JobsResponse>) => {
      console.log('jobs loaded');

      let payloadJobs = action.payload.data.jobs;
      jobs.loading = false;
      // Normalize jobs data
      const jobsById = payloadJobs.reduce((acc, job) => {
        acc[job.id] = {
          title: job.attributes.title,
          skills: job.relationships.skills,
        };
        return acc;
      }, jobs.byId);
      const jobIds = payloadJobs.map((job: any) => job.id);
      // Update state
      jobs.byId = jobsById;
      jobs.allIds = jobs.allIds.concat(jobIds);
      jobs.totalJobs = action.payload.data.meta.count;
      jobs.cursor = action.payload.data.meta.next;
    },
    jobsRequestFailed: (jobs, action: PayloadAction<{ message: string }>) => {
      jobs.loading = false;
      jobs.error = action.payload.message;
    },
  },
});

export const { jobsReceived, jobsRequested, jobsRequestFailed } =
  jobSlice.actions;
export default jobSlice.reducer;

// Action Creators
const jobsURL = '/jobs';
export const loadJobs =
  () => (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(
      apiCall({
        url: jobsURL + `?cursor=${getState().jobs.cursor}`,
        onStartAction: { type: jobsRequested.type },
        onSuccessAction: { type: jobsReceived.type },
        onFailedAction: { type: jobsRequestFailed.type },
      })
    );
  };

// Selectors
export const getJobs = createSelector(
  [
    (state: RootState) => state.jobs,
    (state: RootState) => state.search.searchResults,
    (state: RootState) => state.search.query,
  ],
  ({ byId, allIds }, searchResults, query) => {
    if (query.length >= 3)
      return searchResults.filter((job) =>
        job.title.toLowerCase().includes(query.toLocaleLowerCase())
      );
    return allIds.map((id) => ({ id, ...byId[id] }));
  }
);
export const hasNext = createSelector(
  (state: RootState) => state.jobs,
  (jobs) => jobs.totalJobs > jobs.allIds.length || jobs.totalJobs == -1
);

export const errorLoadingJobs = createSelector(
  (state: RootState) => state.jobs.error,
  (error) => (error ? error : '')
);
