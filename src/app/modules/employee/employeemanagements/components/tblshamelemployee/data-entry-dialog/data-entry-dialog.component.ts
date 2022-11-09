import { Component, OnInit, Input } from "@angular/core";
import { TBLShamelEmployee } from "src/app/modules/shared/models/employees_department/TBLShamelEmployee";


@Component({
  selector: 'app-data-entry-dialog',
  templateUrl: './data-entry-dialog.component.html',
  styleUrls: ['./data-entry-dialog.component.scss']
})
export class DataEntryDialogComponent implements OnInit {

  @Input() SelectedEmp : TBLShamelEmployee;

  constructor() {  
   }

   ngOnInit(): void {
   
  }

  


}
