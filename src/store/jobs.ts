import { Action, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCall } from './middleware/api';
import { Job, JobsState } from '../TS/store';
import { JobResponse, JobsResponse } from '../TS/api';
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
    /* job list load handlers */
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
    /* single job load handlers */
    jobRequested: (jobs, action: PayloadAction<{ jobId: string }>) => {
      jobs.byId[action.payload.jobId] = 'loading';
    },
    jobReceived: (jobs, action: PayloadAction<JobResponse>) => {
      const job = action.payload.data.job;
      jobs.byId[job.id] = {
        title: job.attributes.title,
        skills: job.relationships.skills,
      };
    },
    jobRequestFailed: (
      jobs,
      action: PayloadAction<{ jobId: string; message: string }>
    ) => {
      jobs.byId[action.payload.jobId] = 'error';
    },

    setRelatedJobs: (
      jobs,
      action: PayloadAction<{ jobId: string; relatedJobs: { id: string }[] }>
    ) => {
      let { jobId, relatedJobs } = action.payload;
      let currentJob = jobs.byId[jobId] as Job;
      if (currentJob) {
        relatedJobs.forEach((job) => {
          if (!currentJob.relatedJobs) currentJob.relatedJobs = [job.id];
          else
            !currentJob.relatedJobs.includes(job.id) &&
              currentJob.relatedJobs?.push(job.id);
        });
      }
    },
  },
});

export const {
  jobsReceived,
  jobsRequested,
  jobsRequestFailed,
  jobRequested,
  jobReceived,
  jobRequestFailed,
  setRelatedJobs,
} = jobSlice.actions;
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

const jobURL = '/job/';
export const loadJob =
  (jobId: string) =>
  (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const jobs = getState().jobs;
    if (jobs.byId[jobId]) return;
    dispatch(
      apiCall({
        url: jobURL + jobId,
        onStartAction: { type: jobRequested.type, payload: { jobId } },
        onSuccessAction: { type: jobReceived.type },
        onFailedAction: { type: jobRequestFailed.type, payload: { jobId } },
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
    return allIds.map((id) => ({ id, ...(byId[id] as {}) }));
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
