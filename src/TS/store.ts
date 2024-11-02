export interface Job {
  title: string;
  skills: { id: string }[];
}
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
export interface JobsState extends SliceState<Job> {
  loading: boolean;
  error: false | string;
  totalJobs: number;
  cursor: number;
}
export interface SkillsState extends SliceState<Skill | 'loading'> {}
