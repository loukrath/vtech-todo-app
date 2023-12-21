export interface ITask {
  id : string;
  todo : string;
  isCompleted : boolean;
  updateStatus? : boolean
}