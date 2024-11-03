import TitleCache from '../store/utils/TitleCache';

export interface Job {
  title: string;
  skills: { id: string }[];
}
export type JobWithId = { id: string } & Job;
export interface Skill {
  id: string;
  name: string;
}

interface SliceState<T> {
  byId: {
    [id: string]: T;
  };
  allIds: string[];
}
type LoadingError = false | string;
export interface JobsState extends SliceState<Job> {
  loading: boolean;
  error: LoadingError;
  totalJobs: number;
  cursor: number;
}
export interface SearchState {
  searchResults: (Job & { id: string })[];
  autocompleteResults: TitleCache;
  query: string;
  isQuerying: boolean;
  error: LoadingError;
}

export interface SkillsState extends SliceState<Skill | 'loading'> {}
