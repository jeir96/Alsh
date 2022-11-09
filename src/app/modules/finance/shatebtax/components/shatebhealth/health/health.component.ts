import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, finalize, forkJoin, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import {TBLShamelShatebHealth} from '../../../../../../modules/shared/models/finance_department/shatebtax/TBLShamelShatebHealth';
import {TBLShamelShatebHealthRequest} from '../../../../../../modules/shared/models/finance_department/shatebtax/TBLShamelShatebHealthRequest'


import { AccounterService } from '../../../../../../modules/shared/services/employees_department/accounter.service';
import { TBLShamelShatebHealthService } from '../../../../../../modules/shared/services/finance_department/shatebtax/tblshamel-shateb-health.service';
import { HealthDeleteDialogComponent } from '../health-delete-dialog/health-delete-dialog.component';
import { HealthEditDialogComponent } from '../health-edit-dialog/health-edit-dialog.component';
import { ITBLShamelDocumentType } from '../../../../../../modules/shared/models/employees_department/ITBLShamelDocumentType';
import { ViewTBLShamelEmployee } from '../../../../../../modules/shared/models/employees_department/ViewTBLSamelEmployee';
import { TbLShamelHealthNoSalary } from '../../../../../../modules/shared/models/finance_department/shatebtax/TbLShamelHealthNoSalary';
import { TBLShamelMonthService } from '../../../../../../modules/shared/services/employees_department/tblshamel-month.service';
import { TBLShamelYearService } from '../../../../../../modules/shared/services/employees_department/tblshamel-year.service';
import { TblshameldocumenttypeService } from '../../../../../../modules/shared/services/employees_department/tblshameldocumenttype.service';
import { TBLShamelNewShatebService } from '../../../../../../modules/shared/services/finance_department/payrol/tblshamel-new-shateb.service';
import { TbLShamelHealthNoSalaryService } from '../../../../../../modules/shared/services/finance_department/shatebtax/tbl-shamel-health-no-salary.service';
import { ITBLShamelAccounter } from '../../../../../shared/models/employees_department/TBLShamelAccounter';
import { TBLShamelMonth } from '../../../../../../modules/shared/models/employees_department/TBLShamelMonth';
import { TBLShamelYear } from '../../../../../../modules/shared/models/employees_department/TBLShamelYear';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  List_TBLShamelShatebHealth:TBLShamelShatebHealth[] = [];

 
  dataSource = new MatTableDataSource<TBLShamelShatebHealth>();
  displayedColumns: string[] = [
    'id','payrol_id','fullname','healthnosalary_name','duration','startdate','documenttype_id', 'documentnum', 'documentdate', 'salary','amount', 'month_id','year_id', 'edit', 'delete'];

    Form: FormGroup;

     rowInPage = 100;
     pageIndex = 1;


  List_DocumentType: ITBLShamelDocumentType[] = [];
  List_DocumentType_Filter: Observable<ITBLShamelDocumentType[]> = of([]);

  List_HealthNoSalary: TbLShamelHealthNoSalary[] = [];
  List_HealthNoSalary_Filter: Observable<TbLShamelHealthNoSalary[]> = of([]);

  List_Accounter: ITBLShamelAccounter[] = [];
  List_Accounter_Filter: Observable<ITBLShamelAccounter[]> = of([]);


  List_Employee: ViewTBLShamelEmployee[] = [];
  List_Employee_Filter: Observable<ViewTBLShamelEmployee[]> = of([]);

  Fixed_Month:TBLShamelMonth;
  Fixed_Year:TBLShamelYear;
 

  request: TBLShamelShatebHealthRequest ;
  
  constructor(
    public dialog: MatDialog,
    private healthService: TBLShamelShatebHealthService,
    private frmBuilder : FormBuilder,
    private _snackBar: MatSnackBar,
    public shamelHealthNoSalaryService: TbLShamelHealthNoSalaryService,
    public shameldocumenttypeService: TblshameldocumenttypeService,
    public ShamelNewShatebService: TBLShamelNewShatebService,
    public ShamelMonthService: TBLShamelMonthService,
    public ShamelYearService: TBLShamelYearService,
    private ShamelAccounterService: AccounterService,
    ) 
  { 
   
    this.Form = this. frmBuilder.group({
      startdate_from: new FormControl(''),
      startdate_to: new FormControl(''),
       id: new FormControl(''),
       fname: new FormControl(''),
       lname: new FormControl(''),
       father: new FormControl(''),
       documenttype_id:new FormControl(''),
       documentnum: new FormControl(''),
       documentdate_from: new FormControl(''),
       documentdate_to: new FormControl(''),
       eisaltnum: new FormControl(''),
       eisaldate_from: new FormControl(''),
       eisaldate_to: new FormControl(''),
       accounter_id: new FormControl(''),
       healthnosalary_name: new FormControl(''),
       tax_status: new FormControl(''),
       pageindex:new FormControl(''),
       rowinpage:new FormControl(''),
  

    });

    this.LoadData();

   

    
  }

  
  LoadDocument(): Observable<ITBLShamelDocumentType[]> {
    if (this.shameldocumenttypeService.List_ITBLShamelDocumentType == null ||
      this.shameldocumenttypeService.List_ITBLShamelDocumentType == undefined ||
      this.shameldocumenttypeService.List_ITBLShamelDocumentType.length == 0)
      return this.shameldocumenttypeService.list();
    return of(this.shameldocumenttypeService.List_ITBLShamelDocumentType);
  }


 

  LoadMonth(): Observable<TBLShamelMonth> {
    return this.ShamelMonthService.GetMonthFixed();

  }


  LoadYear(): Observable<TBLShamelYear> {

    return this.ShamelYearService.GetYearFixed();

  }


  LoadHealthNoSalaray(): Observable<TbLShamelHealthNoSalary[]> {
    if (this.shamelHealthNoSalaryService.List_TbLShamelHealthNoSalary == null ||
      this.shamelHealthNoSalaryService.List_TbLShamelHealthNoSalary == undefined ||
      this.shamelHealthNoSalaryService.List_TbLShamelHealthNoSalary.length == 0)
      return this.shamelHealthNoSalaryService.list();
    return of(this.shamelHealthNoSalaryService.List_TbLShamelHealthNoSalary);
  }

  LoadAccounter(): Observable<ITBLShamelAccounter[]> {
    if (this.ShamelAccounterService.List_TblShamelAccounterService == null ||
      this.ShamelAccounterService.List_TblShamelAccounterService == undefined ||
      this.ShamelAccounterService.List_TblShamelAccounterService.length == 0)
      return this.ShamelAccounterService.list();
    return of(this.ShamelAccounterService.List_TblShamelAccounterService);
  }

  LoadData() {
    forkJoin(
      [this.LoadDocument(),
      this.LoadHealthNoSalaray(),
      this.LoadMonth(),
      this.LoadYear(),
      this.LoadAccounter(),



      ]
    ).subscribe(res => {

      this.shameldocumenttypeService.List_ITBLShamelDocumentType = res[0];
      this.shameldocumenttypeService.List_ITBLShamelDocumentType_BehaviorSubject.next(res[0]);
      this.List_DocumentType = res[0];
      this.List_DocumentType_Filter = of(res[0]);

      this.shamelHealthNoSalaryService.List_TbLShamelHealthNoSalary = res[1];
      this.shamelHealthNoSalaryService.List_TbLShamelHealthNoSalary_BehaviorSubject.next(res[1]);
      this.List_HealthNoSalary = res[1];
      this.List_HealthNoSalary_Filter = of(res[1]);


      


      this.Fixed_Month = res[2];
      this.Fixed_Year = res[3];

     
      this.List_Accounter =  res[4];
      this.List_Accounter_Filter = of( res[4]) ;

      this.ShamelAccounterService.List_TblShamelAccounterService = res[4];
      this.ShamelAccounterService.List_TblShamelAccounterServicet_BehaviorSubject .next(res[4]) ;

      if (this.Form!= null)
      {

     


    

    this.List_DocumentType_Filter = this.Form.controls['documenttype_id'].valueChanges
      .pipe(
        startWith(''),
        map(value => value && typeof value === 'string' ? this._filteredDocumentType(value) : this.List_DocumentType.slice())
      );

      this.List_Accounter_Filter = this.Form.controls['accounter_id'].valueChanges
      .pipe(
        startWith(''),
        map(value => value && typeof value === 'string' ? this._filteredAccounter(value) : this.List_Accounter.slice())
      );


    this.List_HealthNoSalary_Filter = this.Form.controls['healthnosalary_name'].valueChanges
      .pipe(
        startWith(''),
        map(value => value && typeof value === 'string' ? this._filteredHealthNoSalary(value) : this.List_HealthNoSalary.slice())
      );
    }

     

    }    , 
    (error) => console.log(error));

  }



  private _filteredAccounter(value: string): ITBLShamelAccounter[] {
    if (value) {
      const filterValue = value;
      return this.List_Accounter.filter(obj => obj.accounter_name.includes(filterValue));

    }
    return this.List_Accounter.slice();
  }

  private _filteredDocumentType(value: string): ITBLShamelDocumentType[] {
    if (value) {
      const filterValue = value;
      return this.List_DocumentType.filter(obj => obj.documenttype_name.includes(filterValue));

    }
    return this.List_DocumentType.slice();
  }

 

  onDocumentSelected(event: MatAutocompleteSelectedEvent) {
    if (event.option.value == null || event.option.value.id == null || event.option.value.id <= 0)
      return;

    var document = event.option.value as ITBLShamelDocumentType;

    const id = document.documenttype_id;
    if (id != null) {
      this.Form.controls['documenttype_id'].setValue(id);

    }

  }
  //#region  Display Display Member
  public displayDocumentTypeProperty(value: string): string {
    if (value && this.List_DocumentType) {
      let documentType: any = this.List_DocumentType.find(crs => crs.documenttype_id.toString() == value);
      if (documentType)
        return documentType.documenttype_name;
    }
    return '';
  }

  private _filteredHealthNoSalary(value: string): TbLShamelHealthNoSalary[] {
    if (value) {
      const filterValue = value;
      return this.List_HealthNoSalary.filter(obj => obj.healthnosalary_name.includes(filterValue));

    }
    return this.List_HealthNoSalary.slice();
  }

  DisplayAccounterProperty(value: string)
  {
    if (value && this.List_Accounter) {
      let accounter: any = this.List_Accounter.find(crs => crs.accounter_id.toString() == value);
      if (accounter)
        return accounter.accounter_name;
    }
    return '';
  }

  


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onScroll() {

    this.pageIndex = this.pageIndex + 1;

    this.Search();
  }

  ngOnInit(): void {
    
   
  }
  btnSearchClick()
  {
    this.pageIndex =1;
    this.List_TBLShamelShatebHealth = [];
    this.dataSource.data = this.List_TBLShamelShatebHealth;
    this.Search();  
  }
  Search(){


    this.Form.controls['pageindex'].setValue(this.pageIndex);
    this.Form.controls['rowinpage'].setValue(this.rowInPage);


    this.healthService.fill(this.Form.value);

    this.healthService.List_TblShamelHealthServicet_BehaviorSubject.subscribe(
      data =>{
        this.List_TBLShamelShatebHealth =this.List_TBLShamelShatebHealth.concat(data) ;
        this.dataSource.data = this.List_TBLShamelShatebHealth;
        console.log("data",data);
      }
    );


  //   this.healthService.search(this.Form.value).subscribe((res: any) =>{

  //     this.List_TBLShamelShatebHealth =this.List_TBLShamelShatebHealth.concat(res) ;
  //     this.dataSource.data = this.List_TBLShamelShatebHealth;

     
   
  // });

  }

  editRec(element: TBLShamelShatebHealth){
    const dialogRef = this.dialog.open(HealthEditDialogComponent, {
      width: '700px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      this.healthService.update(result).subscribe((result: any) => {if(result.Result == 1) {this._snackBar.open("تم التعديل بنجاح","" ,{ duration: 3000 }); this.Search();}});
    });
  }

  deleteRec(element: TBLShamelShatebHealth){
    const dialogRef = this.dialog.open(HealthDeleteDialogComponent, {
      width: '350px',
      data: {
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.healthService.delete(element.serial).subscribe((result: any) => {if(result.Result == 1) {this._snackBar.open("تم الحذف بنجاح","" ,{ duration: 3000 }); this.Search();}});
    });
  }

  insert(){
    const dialogRef = this.dialog.open(HealthEditDialogComponent, {
      width: '1150px',
      data: {
        
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.healthService.add(result).subscribe((result) => {console.log('ddd', result);if(result == 1){ this._snackBar.open("تمت الإضافة بنجاح","" ,{ duration: 3000 }); this.Search();}});
      }
      console.log('ccc',result);
    });
  }
}
