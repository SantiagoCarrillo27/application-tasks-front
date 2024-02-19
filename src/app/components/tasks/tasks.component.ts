import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks:Task[] = [];

  constructor(private taskService:TasksService){}

  ngOnInit(){
    this.taskService.getTasks()
    .subscribe(
      res => {
        // console.log(res);
        this.tasks = res;

      },
      err => console.log(err)
    );
  }

}
