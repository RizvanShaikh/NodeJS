import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ActionColumnService } from '../action-column.service';

@Component({
  selector: 'app-delete-action',
  templateUrl: './delete-action.component.html',
  styleUrls: ['./delete-action.component.css']
})
export class DeleteActionComponent implements OnInit {

  @Input() obj = null;
  @Input() deleteUrl = null;
  @Output() onDelete = new EventEmitter
  
  constructor(
    private _actionService : ActionColumnService
  ) { }

  ngOnInit(): void {
  }

  // deleteObj(){
  //   console.log("\n deleteObj ==> obj.id: ", this.obj.id)
    
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.value) {

  //       this._actionService.deleteObj(this.deleteUrl, this.obj.id).subscribe(
  //         (response)=>{

  //           if(response.success){
  //             this.onDelete.emit();
  //           }
  //           console.log('\n==> response:', response)
  //         }
  //       );

  //     }
  //   })

  // }


}
