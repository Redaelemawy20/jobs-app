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
import toQueryString from '../utils/toQueryString';

const initialState: SearchState = {
  autocompleteResults: new TitleCache(12),
  searchResults: [],
  history: [],
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
      search.query = action.payload;
    },
    setHistory: (searh, action: PayloadAction<string[]>) => {
      searh.history = action.payload;
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
const { queryStarted, resultReceived, queryFailed, setHistory } =
  searchSlice.actions;
export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;

// Action Creators
const queryURL = '/jobs/search';
export const searchJobs =
  () => (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const query = getState().search.query;
    if (query.length <= 3) return;
    const queryString = toQueryString(
      getState().search.query.toLocaleLowerCase()
    );
    dispatch(
      apiCall({
        url: queryURL + `?${queryString}`,
        onStartAction: { type: queryStarted.type },
        onSuccessAction: { type: resultReceived.type },
        onFailedAction: { type: queryFailed.type },
      })
    );
  };

export const loadSearchHistory =
  () => (dispatch: Dispatch<Action>, getState: () => RootState) => {
    if (!localStorage.getItem('history'))
      localStorage.setItem('history', JSON.stringify([]));
    const history = localStorage.getItem('history');
    dispatch(setHistory(history ? JSON.parse(history) : []));
  };

export const storeSearchQuery =
  (query: string) =>
  (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const history = [...getState().search.history];
    if (!history.includes(query)) {
      history.push(query);
      localStorage.setItem('history', JSON.stringify(history));
      dispatch(setHistory(history));
    }
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
