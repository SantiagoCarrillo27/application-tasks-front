export interface Task {
  _id?: number;
  name: string;
  description: string;
  status: string;
  date?: Date;
}
