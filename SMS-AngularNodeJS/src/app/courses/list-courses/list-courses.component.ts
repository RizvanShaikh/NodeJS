import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/_services/courses.service';
import { AppPermissionService } from 'src/app/auth/service/app-permission.service';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css']
})
export class ListCoursesComponent implements OnInit {
  
  objectList : Array<any> = [];

   // permissions
   canAdd : boolean = false;
   canView : boolean = false;
   canEdit : boolean = false;
   canDelete : boolean = false;

   modelPemissionList : Array<string> = [];
  constructor(
    private _courseService: CoursesService,
    private _appPermissionService: AppPermissionService,
  ) { 
    // this.setPermissions();
  }

  ngOnInit() {
    this.getObjectList();
  }
  setPermissions(): void { 
    
    let model = 'Courses List'
    this.modelPemissionList = this._appPermissionService.getModelPermissionList(model)
    this.canAdd  = this.modelPemissionList.includes('add') ? true : false;
    this.canView  = this.modelPemissionList.includes('view') ? true : false;
    this.canEdit  = this.modelPemissionList.includes('edit') ? true : false;
    this.canDelete  = this.modelPemissionList.includes('delete') ? true : false;
  }
  getObjectList(){

    this._courseService.getCourseList().subscribe((response)=>{
      console.log(response.response.courseData, "response from the 25")
          this.objectList = response.response.courseData;
          // this.pagination = response.data.pagination;
          // this.currentPage = this.pagination.current_page; 
          // this.size = this.pagination.size; 
      }),
      ((error)=> {
        this.objectList = [];
      })
  }
}
