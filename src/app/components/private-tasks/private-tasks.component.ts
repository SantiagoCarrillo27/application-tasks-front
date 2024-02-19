import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from 'src/models/task';

@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css']
})
export class PrivateTasksComponent {

  constructor(private taskService:TasksService){}

  tasks:Task[] = [];

  ngOnInit(){
    this.taskService.getTasks()
    .subscribe(
      res => {
        console.log(res);
        this.tasks = res;

      },
      err => console.log(err)
    );
  }

}



