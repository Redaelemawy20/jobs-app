interface Job {
  id: string;
  type: string;
  attributes: {
    title: string;
  };
  relationships: {
    skills: Array<{ id: string }>;
  };
}
export interface JobResponse {
  job: Job;
}
export interface JobsResponse {
  jobs: Job[];
  meta: {
    next: number;
    count: number;
  };
}
export interface SkillResponse {
  skill: {
    id: string;
    type: string;
    attributes: {
      name: string;
      type: string;
      importance: string;
      level: string;
    };
    relationships: {
      jobs: Array<{ id: string }>;
      skills: Array<{ id: string }>;
    };
  };
}
