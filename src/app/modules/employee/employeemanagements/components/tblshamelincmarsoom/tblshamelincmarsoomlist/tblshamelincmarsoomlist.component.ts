import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationdialogComponent } from '../../common/confirmationdialog/confirmationdialog.component';
import { TblshamelincmarsoommodifyComponent } from '../tblshamelincmarsoommodify/tblshamelincmarsoommodify.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ITBLShamelIncMarsoom } from 'src/app/modules/shared/models/employees_department/ITBLShamelIncMarsoom';
import { IGlobalEmployeeList } from 'src/app/modules/shared/services/employees_department/IGlobalEmployeeList';
import { TblshamelincmarsoomService } from 'src/app/modules/shared/services/employees_department/tblshamelincmarsoom.service';

@Component({
  selector: 'app-tblshamelincmarsoomlist',
  templateUrl: './tblshamelincmarsoomlist.component.html',
  styleUrls: ['./tblshamelincmarsoomlist.component.scss']
})
export class TblshamelincmarsoomlistComponent implements OnInit ,AfterViewInit  {
  //Join Variable   

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<ITBLShamelIncMarsoom>;

  // List For Table
  IncMarsoom_List :ITBLShamelIncMarsoom []=[];
  selected_IncMarsoom  :ITBLShamelIncMarsoom = {};

  displayedColumns: string[] = [ 'changedate','documenttype_name', 'document_number',
                                'documentdate', 'changereason_name' , 'incpercentage','additionalvalue','begindate','action'];




  constructor(
    public IncMarsoomService : TblshamelincmarsoomService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public GlobalEmployeeList:IGlobalEmployeeList ) {

      this.dataSource = new MatTableDataSource<ITBLShamelIncMarsoom>([]);
      this.IncMarsoom_List =[];
      this.dataSource.data = this.IncMarsoom_List;

      if (this.IncMarsoomService.List_ITBLShamelIncMarsoom == null||
        this.IncMarsoomService.List_ITBLShamelIncMarsoom.length ==0 )
              this.IncMarsoomService.fill();          
              this.IncMarsoomService.List_ITBLShamelIncMarsoom_BehaviorSubject.subscribe(
                data=>
                {
                  this.IncMarsoom_List = data;
                  this.dataSource.data = this.IncMarsoom_List ;
                }
              )

        this.FillTable();
     }
    
    

 
 
   ngOnInit(): void {
     this.dataSource = new MatTableDataSource(this.IncMarsoom_List);
   }
   ngAfterViewInit() {
     this.dataSource = new MatTableDataSource(this.IncMarsoom_List);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   }
 
 
 
 
   public async FillTable() {
     try {
       
      this.IncMarsoomService.fill();
 
 
     } catch (ex: any) { }
 
 
   }
 
 
 

   

 
    



  


  Add(): void {

    this.selected_IncMarsoom  = {};


    const dialogRef = this.dialog.open(TblshamelincmarsoommodifyComponent, {
      height: '80%',
      width: '80%',
      data: {obj: this.selected_IncMarsoom}
    });
   
    dialogRef.afterClosed().toPromise().then(result => {
     
      this.FillTable();
      
    });
  }


  async Delete(element:ITBLShamelIncMarsoom)
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
         

          if (element.incmarsoom_id != null )
          {

          this.IncMarsoomService.delete(element.incmarsoom_id).toPromise().then(res=> 
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
        }
      });
}catch(ex:any)  
{

}

  }


  async Update(element:ITBLShamelIncMarsoom)
  {
    if (element != null  && element.incmarsoom_id != null &&   element.incmarsoom_id >0)
    {
      this.selected_IncMarsoom = element;

      const dialogRef = this.dialog.open(TblshamelincmarsoommodifyComponent, {
        height: '80%',
        width: '80%',
        data: {obj: this.selected_IncMarsoom}
      });
  
      dialogRef.afterClosed().toPromise().then(result => {
        this.FillTable();        
      });

    }


  }




}
