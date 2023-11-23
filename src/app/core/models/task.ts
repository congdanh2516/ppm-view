export interface Task {
  taskId?: string;
  taskName: string;
  taskDescription: string;
  taskStartAt: Date;
  taskEndAt: Date;
  taskDuration: number;
  taskStatus: string;
  projectId: string;
  taskParentId: string;
  subtasks: Array<Task>;
}
