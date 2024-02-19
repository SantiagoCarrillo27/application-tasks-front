import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  loading: boolean = true; // Variable para controlar si las tareas se están cargando

  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (res) => {
        this.tasks = res;
        this.loading = false; // Indica que las tareas se han cargado correctamente
      },
      (err) => {
        console.error(err);
        this.loading = false; // Indica que hubo un error al cargar las tareas
      }
    );
  }
}
