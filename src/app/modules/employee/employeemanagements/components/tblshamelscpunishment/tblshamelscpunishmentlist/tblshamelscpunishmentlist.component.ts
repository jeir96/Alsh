import { Component, OnInit, AfterViewInit, ViewChild, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ITBLShamelSCCancelPunishment } from "src/app/modules/shared/models/employees_department/ITBLShamelSCCancelPunishment";
import { ITBLShamelSCPunishment } from "src/app/modules/shared/models/employees_department/ITBLShamelSCPunishment";
import { TBLShamelEmployee } from "src/app/modules/shared/models/employees_department/TBLShamelEmployee";
import { TBLShamelSCPunishmentService } from "src/app/modules/shared/services/employees_department/tblshamel-scpunishment.service";
import { EmployeePageService } from "../../employee-page-service";
import { ConfirmationdialogComponent } from "../../common/confirmationdialog/confirmationdialog.component";
import { TblshamelscpunishmentmodifyComponent } from "../tblshamelscpunishmentmodify/tblshamelscpunishmentmodify.component";

@Component({
  selector: 'app-tblshamelscpunishmentlist',
  templateUrl: './tblshamelscpunishmentlist.component.html',
  styleUrls: ['./tblshamelscpunishmentlist.component.scss']
})
export class TblshamelscpunishmentlistComponent implements OnInit ,AfterViewInit  {

    //Join Variable   
    Selected_Emp: TBLShamelEmployee = {};
    @ViewChild('paginator') paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
  //Join Variable   
  @Input() id:number;

  // List For Table
  employee_Punishment_List :ITBLShamelSCPunishment []=[];
  dataSource: MatTableDataSource<ITBLShamelSCPunishment>;

  selected_employee_Punishment :ITBLShamelSCPunishment;
  displayedColumns: string[] = ['punishment_name','punishmentreason_name' , 'documenttype_name' , 'document_number', 'documentdate' ,'is_cancel','action'];


  // Select Object
  selected_employee_Punishment_Rows = new Set<ITBLShamelSCPunishment>();                              
 


  constructor(
    public PageService: EmployeePageService,
    public ShamelSCPunishmentService : TBLShamelSCPunishmentService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {


      this.employee_Punishment_List =[];

      this.dataSource = new MatTableDataSource([]);
    
    
      this.dataSource.data = this.employee_Punishment_List;
  
      this.PageService.Subject_Selected_TBLShamelEmployee.subscribe(
        data => {
          this.Selected_Emp = data;
          this.id =this.Selected_Emp.id;
          console.log('عقوبت');
          console.log(this.Selected_Emp );
        }
      )
  
  
      this.PageService.Subject_Selected_TBLShamelEmployee.subscribe
        (
          data => {
            this.employee_Punishment_List = data.TBLShamelSCPunishments;
            this.dataSource.data = this.employee_Punishment_List;
          }
        )

     }


     ngOnInit(): void {
      this.dataSource = new MatTableDataSource(this.employee_Punishment_List);
    }
    ngAfterViewInit() {
      this.dataSource = new MatTableDataSource(this.employee_Punishment_List);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    



    public async FillTable()
    {
     try{
      if (this.Selected_Emp && this.Selected_Emp.id != null && this.Selected_Emp.id > 0) 
      {

        this.ShamelSCPunishmentService.list(this.id).toPromise().then(
          (data:any)=>
          {      
            this.employee_Punishment_List=data;   
                
          }
        );
       }



     }catch(ex :any){}


    }

 
    

    AddCancelPunshiment(element:ITBLShamelSCPunishment): void {


      this.selected_employee_Punishment =  element;
      if (this.selected_employee_Punishment!= null &&
         this.selected_employee_Punishment.serial != null &&
        this.selected_employee_Punishment.serial >0)
        {
        
      let selected_employee_CancelPunishment : ITBLShamelSCCancelPunishment=  {};      
      selected_employee_CancelPunishment.id = this.id;
      selected_employee_CancelPunishment.serial_punishment =element.serial;


      const dialogRef = this.dialog.open(TblshamelscpunishmentmodifyComponent, {
        height: '80%',
        width: '80%',
        data: {
          Parent: this.selected_employee_Punishment,
          obj: selected_employee_CancelPunishment,id:this.Selected_Emp.id}
      });
     
      dialogRef.afterClosed().toPromise().then(result => {
       
        this.FillTable();
        
      });
    }
    }
  

  

    


  Add(): void {

    this.selected_employee_Punishment =  {};
    this.selected_employee_Punishment.id = this.Selected_Emp.id;



    console.log(this.selected_employee_Punishment);
    const dialogRef = this.dialog.open(TblshamelscpunishmentmodifyComponent, {
      height: '80%',
      width: '80%',
      data: {obj: this.selected_employee_Punishment,id:this.selected_employee_Punishment.id}
    });
   
    dialogRef.afterClosed().toPromise().then(result => {
     
      this.FillTable();
      
    });
  }


  async Delete(element:ITBLShamelSCPunishment)
  {
    
try{
      const dialogRef = this.dialog.open(ConfirmationdialogComponent,{
        data:{
          message: 'هل أنت متأكد من الحذف?',
          buttonText: {
            ok: 'نعم',
            cancel: 'لا'
          }
        }
      });

      

      dialogRef.afterClosed().toPromise().then((confirmed: boolean) => {
        if (confirmed) {
     
          const snack = this.snackBar.open('سوف يتم الآن الحذف');
         


          this.ShamelSCPunishmentService.delete(element.serial).toPromise().then(res=> 
            {
              snack.dismiss();

              console.log(res);
              if (res==1)
                this.FillTable();

            });
            this.snackBar.open('تم الحذف', 'Fechar', {
              duration: 2000,
            });

            this.snackBar.dismiss();
 
         
        }
      });
}catch(ex:any)  
{

}

  }


  async Update(element:ITBLShamelSCPunishment)
  {
    if (element!= null && element.serial != null )
    {
      this.selected_employee_Punishment = element;

      const dialogRef = this.dialog.open(TblshamelscpunishmentmodifyComponent, {
        height: '80%',
        width: '80%',
        data: {obj: this.selected_employee_Punishment,id:this.selected_employee_Punishment.id}
      });
  
      dialogRef.afterClosed().toPromise().then(result => {
        this.FillTable();        
      });

    }


  }




}
