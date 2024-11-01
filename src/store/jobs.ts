import { Action, createSlice, Dispatch, GetState } from '@reduxjs/toolkit';
import { apiCall } from './middleware/api';
import { JobsState } from '../TS/store';

const intialState: JobsState = {
  byId: {},
  allIds: [],
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
    jobsReceived: (jobs, action) => {
      console.log('job recived ');
      let payloadJobs = action.payload.data.jobs;
      jobs.loading = false;
      // Normalize jobs data
      const jobsById = payloadJobs.reduce((acc: typeof jobs.byId, job: any) => {
        acc[job.id] = job;
        return acc;
      }, jobs.byId);
      console.log(jobsById);

      const jobIds = payloadJobs.map((job: any) => job.id);
      // Update state
      jobs.byId = jobsById;
      jobs.allIds = jobIds;
    },
    jobsRequestFailed: (jobs) => {
      jobs.loading = false;
      jobs.error = true;
    },
  },
});

const { jobsReceived, jobsRequested, jobsRequestFailed } = jobSlice.actions;
export default jobSlice.reducer;

// Action Creators
const jobsURL = '/jobs';
export const loadJobs =
  () => (dispatch: Dispatch<Action>, getState: GetState<[]>) => {
    dispatch(
      apiCall({
        url: jobsURL,
        onStartActionType: jobsRequested.type,
        onSuccessActionType: jobsReceived.type,
        onFaildActionType: jobsRequestFailed.type,
      })
    );
  };
