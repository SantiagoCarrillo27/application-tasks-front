import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../models/task';




@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private URL = 'https://auth-task-node.onrender.com/api';

  constructor(private httpClient:HttpClient) { }

  getTasks(){
    return this.httpClient.get<Task[]>(`${this.URL}/tasks`);
  }
  getPrivateTasks(){
    return this.httpClient.get<Task[]>(`${this.URL}/private-tasks`);
  }


}
