import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';

export const TaskRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Task',
      status: false
    },
    children: [
        {
            path: 'details',
            loadChildren: './details-task/details-task.module#DetailsTaskModule'

        },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TaskRoutes),
    SharedModule
  ],
  declarations: [TaskComponent]
})
export class TaskModule { }
