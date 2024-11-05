import TitleCache from '../store/utils/TitleCache';

export interface Job {
  title: string;
  skills: { id: string }[];
  relatedJobs?: string[];
}
export type JobWithId = { id: string } & Job;
export interface Skill {
  id: string;
  name: string;
  type: string;
  importance: string;
  level: string;
  relationships: {
    jobs: Array<{ id: string }>;
    skills: Array<{ id: string }>;
  };
}

interface SliceState<T> {
  byId: {
    [id: string]: T;
  };
  allIds: string[];
}
type LoadingError = false | string;
export interface JobsState extends SliceState<Job | 'loading' | 'error'> {
  loading: boolean;
  error: LoadingError;
  totalJobs: number;
  cursor: number;
}
export interface SearchState {
  searchResults: (Job & { id: string })[];
  autocompleteResults: string[];
  history: string[];
  query: string;
  isQuerying: boolean;
  error: LoadingError;
}

export interface SkillsState extends SliceState<Skill | 'loading' | 'error'> {}
