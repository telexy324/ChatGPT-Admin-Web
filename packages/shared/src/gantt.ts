import { GanttType } from '@prisma/client';
export interface IGanttObject {
  autoIncrementId: number;
  name: string;
  id: string;
  progress: number;
  type: GanttType;
  hideChildren: boolean;
  displayOrder: number;
  dependencies: number[];
  dependents: number[];
  start: string;
  end: string;
}