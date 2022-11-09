
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, startWith, map, of, forkJoin, debounceTime, finalize, switchMap, tap } from 'rxjs';
import { ITBLShamelAccounter } from 'src/app/modules/shared/models/employees_department/TBLShamelAccounter';
import { ITBLShamelDocumentType } from 'src/app/modules/shared/models/employees_department/ITBLShamelDocumentType';
import { TBLShamelMonth } from 'src/app/modules/shared/models/employees_department/TBLShamelMonth';
import { TBLShamelYear } from 'src/app/modules/shared/models/employees_department/TBLShamelYear';
import { ViewTBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/ViewTBLSamelEmployee';
import { TBLShamelShatebVartax } from 'src/app/modules/shared/models/finance_department/shatebtax/TBLShamelShatebVartax';
import { TblShamelVarTax } from 'src/app/modules/shared/models/finance_department/shatebtax/TblShamelVarTax';
import { AccounterService } from 'src/app/modules/shared/services/employees_department/accounter.service';
import { TBLShamelMonthService } from 'src/app/modules/shared/services/employees_department/tblshamel-month.service';
import { TBLShamelYearService } from 'src/app/modules/shared/services/employees_department/tblshamel-year.service';
import { TblshameldocumenttypeService } from 'src/app/modules/shared/services/employees_department/tblshameldocumenttype.service';
import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';
import { TblShamelVarTaxService } from 'src/app/modules/shared/services/finance_department/shatebtax/tbl-shamel-var-tax.service';
import { TBLShamelShatebVarTaxService } from 'src/app/modules/shared/services/finance_department/shatebtax/tblshamel-shateb-var-tax.service';
import { VarTaxDeleteDialogComponent } from '../var-tax-delete-dialog/var-tax-delete-dialog.component';
import { VarTaxEditDialogComponent } from '../var-tax-edit-dialog/var-tax-edit-dialog.component';



@Component({
  selector: 'app-var-tax',
  templateUrl: './var-tax.component.html',
  styleUrls: ['./var-tax.component.scss']
})
export class VarTaxComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource = new MatTableDataSource<TBLShamelShatebVartax>();
  displayedColumns: string[] = [
    'id','payrol_ID','fullName','healthnosalary_name','salary','amount','duration','documenttype_id', 'documentnum', 'documentdate',  'month_id','year_id', 'edit', 'delete'];

 
    rowInPage = 100;
    pageIndex = 1;
    List_DocumentType: ITBLShamelDocumentType[] = [];
    List_DocumentType_Filter: Observable<ITBLShamelDocumentType[]> = of([]);
  
    List_Employee: ViewTBLShamelEmployee[] = [];
    List_Employee_Filter: Observable<ViewTBLShamelEmployee[]> = of([]);

    
    List_TblShamelVarTax: TblShamelVarTax[] = [];
    List_TblShamelVarTax_Filter: Observable<TblShamelVarTax[]> = of([]);


  
    List_Accounter: ITBLShamelAccounter[] = [];
    List_Accounter_Filter: Observable<ITBLShamelAccounter[]> = of([]);
  
    Fixed_Month: TBLShamelMonth;
    Fixed_Year: TBLShamelYear;
  
    List_TBLShamelShatebVartax : TBLShamelShatebVartax[];


    Form : FormGroup;

  
  constructor(
    public dialog: MatDialog,
    private frmBuild:FormBuilder,
    private ShamelShatebVarTaxService: TBLShamelShatebVarTaxService,
    private ShamelVarTaxService: TblShamelVarTaxService,
    private ShamelAccounterService: AccounterService,
    public shameldocumenttypeService: TblshameldocumenttypeService,
    public viewTBLShamelEmployeeService: ViewTBLShamelEmployeeService,
    public ShamelMonthService: TBLShamelMonthService,
    public ShamelYearService: TBLShamelYearService,
    private _snackBar: MatSnackBar) 
  { 
    
    this.BuilForm();

    this.LoadData();
    
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

   
  }

BuilForm()
{
  this.Form = this.frmBuild.group({
    pageindex:new FormControl<number | undefined|null>(undefined),
    rowinpage: new FormControl<number | undefined|null>(undefined),
    vartax_id: new FormControl<number | undefined|null>(undefined),    
    serial: new FormControl<number | undefined|null>(undefined),
    id: new FormControl<number | undefined|null>(undefined),   
    documenttype_id: new FormControl<string | undefined|null>(undefined),
    documentnum: new FormControl<string| undefined|null>(undefined),
    documentdate_from: new FormControl<Date | undefined|null>(undefined),
    documentdate_to: new FormControl<Date| undefined|null>(undefined),
    salary: new FormControl<number | undefined|null>(undefined),
    amount: new FormControl<number | undefined|null>(undefined),
    eisalnum: new FormControl<string | undefined|null>(undefined),
    eisaldate_from: new FormControl<Date| undefined|null>(undefined),
    eisaldate_to: new FormControl<Date | undefined|null>(undefined),
    year_id: new FormControl<number | undefined|null>(undefined),
    month_id: new FormControl<number | undefined|null>(undefined),
    fname: new FormControl<string| undefined|null>(undefined),
    lname: new FormControl<string| undefined|null>(undefined),
    father: new FormControl<string | undefined|null>(undefined),
    mother: new FormControl<string| undefined|null>(undefined),
    tax_status: new FormControl<number | undefined|null>(undefined),
    accounter_id:new FormControl<number | undefined|null>(undefined),


   
  });
}

  LoadAccounter(): Observable<ITBLShamelAccounter[]> {
    if (this.ShamelAccounterService.List_TblShamelAccounterService == null ||
      this.ShamelAccounterService.List_TblShamelAccounterService == undefined ||
      this.ShamelAccounterService.List_TblShamelAccounterService.length == 0)
      return this.ShamelAccounterService.list();
    return of(this.ShamelAccounterService.List_TblShamelAccounterService);
  }
  
  LoadDocument(): Observable<ITBLShamelDocumentType[]> {
    if (this.shameldocumenttypeService.List_ITBLShamelDocumentType == null ||
      this.shameldocumenttypeService.List_ITBLShamelDocumentType == undefined ||
      this.shameldocumenttypeService.List_ITBLShamelDocumentType.length == 0)
      return this.shameldocumenttypeService.list();
    return of(this.shameldocumenttypeService.List_ITBLShamelDocumentType);
  }



  LoadVarTax(): Observable<TblShamelVarTax[]> {
    if (this.ShamelVarTaxService.List_TblShamelVarTax == null ||
      this.ShamelVarTaxService.List_TblShamelVarTax == undefined ||
      this.ShamelVarTaxService.List_TblShamelVarTax.length == 0)
      return this.ShamelVarTaxService.list();
    return of(this.ShamelVarTaxService.List_TblShamelVarTax);
  }

  LoadMonth(): Observable<TBLShamelMonth> {
    return this.ShamelMonthService.GetMonthFixed();

  }


  LoadYear(): Observable<TBLShamelYear> {

    return this.ShamelYearService.GetYearFixed();

  }

  LoadData() {
    forkJoin(
      [this.LoadDocument(),
      this.LoadMonth(),
      this.LoadYear(),
      this.LoadAccounter(),
      this.LoadVarTax()
      ]
    ).subscribe(res => {

     


      this.shameldocumenttypeService.List_ITBLShamelDocumentType = res[0];
      this.shameldocumenttypeService.List_ITBLShamelDocumentType_BehaviorSubject.next(res[0]);
      this.List_DocumentType = res[0];
      this.List_DocumentType_Filter = of(res[0]);


      this.Fixed_Month = res[1];
      this.Fixed_Year = res[2];


      this.ShamelAccounterService.List_TblShamelAccounterService = res[3];
      this.ShamelAccounterService.List_TblShamelAccounterServicet_BehaviorSubject.next(res[3]);
      this.List_Accounter = res[3];
      this.List_Accounter_Filter = of(res[3]);


      this.ShamelVarTaxService.List_TblShamelVarTax = res[4];
      this.ShamelVarTaxService.List_TblShamelVarTax_BehaviorSubject.next(res[4]);
      this.List_TblShamelVarTax = res[4];
      this.List_TblShamelVarTax_Filter = of(res[4]);


      if (this.Form != null) {




        this.Form.controls['fullname']
          .valueChanges
          .pipe(
            debounceTime(300),
            tap(() => {}),
            switchMap((value: string) => this.viewTBLShamelEmployeeService.getEmpFullName2(value)
              .pipe(
                finalize(() => {}),
              )
            )
          )
          .subscribe(emps => {
            if (emps != null && emps.length > 0
            ) {
              this.List_Employee = emps;
              this.List_Employee_Filter = of(emps);
              console.log(emps);
            }
          });


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

          this.List_TblShamelVarTax_Filter = this.Form.controls['vartax_id'].valueChanges
          .pipe(
            startWith(''),
            map(value => value && typeof value === 'string' ? this._filteredVarTax(value) : this.List_TblShamelVarTax.slice())
          );
      }


    },
      (error) => console.log(error));

  }

  displayFn(emp: ViewTBLShamelEmployee) {
    if (emp != null && emp.id > 0) {

      return emp.fullname;
    }
    return '';
  }



  onEmployeeSelected(event: MatAutocompleteSelectedEvent) {
    if (event.option.value == null)
      return;
    var emp = event.option.value;

    const id = emp.id;

    this.Form.controls['id'].setValue(id);

    if (id != null && id > 0) {
      this.Form.controls['id'].setValue(id);
    }

  }
  


  private _filteredVarTax(value: string): TblShamelVarTax[] {
    if (value) {
      const filterValue = value;
      return this.List_TblShamelVarTax.filter(obj => obj.vartax_name.includes(filterValue));

    }
    return this.List_TblShamelVarTax.slice();
  }


  private _filteredDocumentType(value: string): ITBLShamelDocumentType[] {
    if (value) {
      const filterValue = value;
      return this.List_DocumentType.filter(obj => obj.documenttype_name.includes(filterValue));

    }
    return this.List_DocumentType.slice();
  }

  private _filteredAccounter(value: string): ITBLShamelAccounter[] {
    if (value) {
      const filterValue = value;
      return this.List_Accounter.filter(obj => obj.accounter_name.includes(filterValue));

    }
    return this.List_Accounter.slice();
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

  
  btnSearchClick()
  {
    this.pageIndex =1;
    this.List_TBLShamelShatebVartax = [];
    this.dataSource.data = this.List_TBLShamelShatebVartax;
    this.Search();  
  }
  Search(){
   
    this.Form.controls['pageindex'].setValue(this.pageIndex);
    this.Form.controls['rowinpage'].setValue(this.rowInPage);


    this.ShamelShatebVarTaxService.fill(this.Form.value);

    this.ShamelShatebVarTaxService.List_TblShamelVarTaxServicet_BehaviorSubject.subscribe(
      data =>{
        this.List_TBLShamelShatebVartax =this.List_TBLShamelShatebVartax.concat(data) ;
        this.dataSource.data = this.List_TBLShamelShatebVartax;
        console.log('data', data);
      }
    );


  //   this.ShamelShatebVarTaxService.search(this.Form.value).subscribe((res: any) =>{

  //     this.List_TBLShamelShatebVartax =this.List_TBLShamelShatebVartax.concat(res) ;
  //     this.dataSource.data = this.List_TBLShamelShatebVartax;

  // });



  }

  onScroll() {

    this.pageIndex = this.pageIndex + 1;

    this.Search();
  }

  editRec(element: TBLShamelShatebVartax){
    const dialogRef = this.dialog.open(VarTaxEditDialogComponent, {
      width: '350px',
      data: {
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);
      this.ShamelVarTaxService.update(result).subscribe((result: any) => {if(result.Result == 1) {this._snackBar.open("تم التعديل بنجاح","" ,{ duration: 3000 }); this.Search();}});
    });
  }

  deleteRec(element: TBLShamelShatebVartax){
    const dialogRef = this.dialog.open(VarTaxDeleteDialogComponent, {
      width: '350px',
      data: {
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.ShamelVarTaxService.delete(element.serial).subscribe((result: any) => {if(result.Result == 1) {this._snackBar.open("تم الحذف بنجاح","" ,{ duration: 3000 }); this.Search();}});
    });
  }

  insert(){
    const dialogRef = this.dialog.open(VarTaxEditDialogComponent, {
      width: '1150px',
      data: {
        
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.ShamelVarTaxService.add(result).subscribe((result) => {console.log('ddd', result);if(result == 1) {this._snackBar.open("تمت الإضافة بنجاح","" ,{ duration: 3000 }); this.Search();}});
      }
      console.log('ccc',result);
    });
  }

}
