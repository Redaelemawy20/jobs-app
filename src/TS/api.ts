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
  data: {
    job: Job;
  };
}
export interface JobsResponse {
  data: {
    jobs: Job[];
    meta: {
      next: number;
      count: number;
    };
  };
}
export interface SkillResponse {
  data: {
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
  };
}
