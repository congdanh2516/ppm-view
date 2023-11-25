export interface Task {
  taskId?: string;
  taskName: string | null;
  taskDescription: string | null;
  taskStartAt?: Date;
  taskEndAt?: Date;
  taskDuration: number | undefined;
  projectId: string | undefined;
}
