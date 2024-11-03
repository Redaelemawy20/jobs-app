import {
  Action,
  createSelector,
  createSlice,
  Dispatch,
  PayloadAction,
} from '@reduxjs/toolkit';
import { SearchState } from '../TS/store';
import { jobsReceived } from './jobs';
import { JobsResponse } from '../TS/api';
import TitleCache from './utils/TitleCache';
import { RootState } from './store';
import { apiCall } from './middleware/api';

const initialState: SearchState = {
  autocompleteResults: new TitleCache(12),
  searchResults: [],
  query: '',
  error: false,
  isQuerying: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    queryStarted: (search, action) => {
      search.isQuerying = true;
    },
    resultReceived: (search, action: PayloadAction<JobsResponse>) => {
      search.isQuerying = false;
      let payloadJobs = action.payload.data.jobs;

      let results = payloadJobs.map((job) => {
        let title = job.attributes.title;
        search.autocompleteResults.add(title);
        return {
          id: job.id,
          title,
          skills: job.relationships.skills,
        };
      });
      search.searchResults = results;
    },
    queryFailed: (search, action) => {
      search.isQuerying = false;
      search.error = 'error';
    },
    setSearchQuery: (search, action: PayloadAction<string>) => {
      console.log(action.payload);

      search.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      jobsReceived,
      (search, action: PayloadAction<JobsResponse>) => {
        let payloadJobs = action.payload.data.jobs;
        payloadJobs.forEach((job) => {
          search.autocompleteResults.add(job.attributes.title);
        });
      }
    );
  },
});
const { queryStarted, resultReceived, queryFailed } = searchSlice.actions;
export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;

// Action Creators
const queryURL = '/jobs/search';
export const searchJobs =
  (query: string) =>
  (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const params = new URLSearchParams({ query: query.toLocaleLowerCase() });
    dispatch(
      apiCall({
        url: queryURL + `?${params.toString()}`,
        onStartAction: { type: queryStarted.type },
        onSuccessAction: { type: resultReceived.type },
        onFailedAction: { type: queryFailed.type },
      })
    );
  };

// Selectors
export const getAutocompleteList = createSelector(
  (state: RootState) => state.search.autocompleteResults.getTitles(),
  (_: RootState, query: string) => query,
  (autocompleteResults: string[], query: string) =>
    autocompleteResults.filter((title) => {
      return title.toLowerCase().includes(query.toLowerCase());
    })
);
