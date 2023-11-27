import { Data } from 'popper.js';

export interface Project {
  projectId?: string;
  projectName: string;
  projectStartAt: any;
  projectEndAt: Data;
  projectDuration: number;
  projectStatus: string;
  projectCreatorId: string;
}
