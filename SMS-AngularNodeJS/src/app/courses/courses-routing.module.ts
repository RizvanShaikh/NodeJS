import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCoursesComponent } from './list-courses/list-courses.component';
import { AddCoursesComponent } from './add-courses/add-courses.component';
import { ViewCoursesComponent } from './view-courses/view-courses.component';

const routes: Routes = [
  { path: '', component: ListCoursesComponent , data: {title: 'List Courses'}},
  { path: 'add', component: AddCoursesComponent , data: {title: 'Add Courses'}},
  { path: 'edit/:id', component: AddCoursesComponent , data: {title: 'Update Courses'}},
  { path: 'view', component: ViewCoursesComponent , data: {title: 'View Courses'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
