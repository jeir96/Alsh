import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Observable, of, startWith, map } from 'rxjs';
import { ITBLShamelDocumentType } from 'src/app/modules/shared/models/employees_department/ITBLShamelDocumentType';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { TBLShamelSCSuddenHoliday } from 'src/app/modules/shared/models/employees_department/TBLShamelSCSuddenHoliday';
import { TBLShamelSuddenHoliday } from 'src/app/modules/shared/models/employees_department/TBLShamelSuddenHoliday';
import { TBLShamelSCSuddenHolidayService } from 'src/app/modules/shared/services/employees_department/tblshamel-sc-sudden-holiday.service';
import { TBLShamelSuddenHolidayService } from 'src/app/modules/shared/services/employees_department/tblshamel-sudden-holiday.service';
import { TblshameldocumenttypeService } from 'src/app/modules/shared/services/employees_department/tblshameldocumenttype.service';
import { EmployeePageService } from '../../pageservice/employee-page-service';

@Component({
  selector: 'app-tblshamel-sc-sudden-holiday-add',
  templateUrl: './tblshamel-sc-sudden-holiday-add.component.html',
  styleUrls: ['./tblshamel-sc-sudden-holiday-add.component.scss']
})
export class TBLShamelSCSuddenHolidayAddComponent implements OnInit {

  id: number;
  Selected_Emp: TBLShamelEmployee = {};
  
  _Selected_Employee_SCSuddenHoliday: TBLShamelSCSuddenHoliday
  @Input() set Selected_Employee_SCSuddenHoliday(obj: TBLShamelSCSuddenHoliday) {
    this._Selected_Employee_SCSuddenHoliday = obj;
    console.log('بلش');

    if (this._Selected_Employee_SCSuddenHoliday != null &&
      this._Selected_Employee_SCSuddenHoliday != undefined) {
      console.log('سث');
      console.log(this._Selected_Employee_SCSuddenHoliday);
      this.SetValue();
    }
  }

  get Selected_Employee_SCSuddenHoliday(): TBLShamelSCSuddenHoliday {
    return this._Selected_Employee_SCSuddenHoliday;
  }

  //Array Of AutoComplere With Filter
  
  DocumentType_List :ITBLShamelDocumentType[]=[];
  filteredDocumentTypeOptions: Observable<ITBLShamelDocumentType[]>;


  
  TBLShamelSuddenHoliday_List :TBLShamelSuddenHoliday[]=[];
  Filtered_TBLShamelSuddenHoliday: Observable<TBLShamelSuddenHoliday[]>;


  // Access To Element in Form
  Form: UntypedFormGroup ;
  fcl_duration   = new UntypedFormControl();
  fcl_startdate  = new UntypedFormControl();
  fcl_enddate  = new UntypedFormControl();
  fcl_suddenholiday_id= new UntypedFormControl();
  fcl_notes= new UntypedFormControl();
  fcl_documenttype_id   = new UntypedFormControl();  
  fcl_document_number  = new UntypedFormControl();
  fcl_documentdate = new UntypedFormControl();

  //Local Var

  submitted = false;
  loading: boolean = false;

  //#region Constuctor 
  constructor(    
    @Inject(MAT_DIALOG_DATA) public data: {obj: TBLShamelSCSuddenHoliday,id:number},
    public ShamelSCSuddenHolidayService:TBLShamelSCSuddenHolidayService,
    public ShamelSuddenHolidayService:TBLShamelSuddenHolidayService,
    public ShameldocumenttypeService:TblshameldocumenttypeService ,
    private fb: UntypedFormBuilder,
    public PageService: EmployeePageService,
    ) {
      this.PageService.Subject_Selected_TBLShamelEmployee.subscribe(
        data => {
          this.Selected_Emp = data;
          this.id = this.Selected_Emp.id;
        }
      )
  
      if (this.ShamelSuddenHolidayService.List_TBLShamelSuddenHolidayService == null ||
        this.ShamelSuddenHolidayService.List_TBLShamelSuddenHolidayService == undefined ||
        this.ShamelSuddenHolidayService.List_TBLShamelSuddenHolidayService.length == 0)
        this.ShamelSuddenHolidayService.fill();
      this.ShamelSuddenHolidayService.List_TBLShamelSuddenHolidayService_BehaviorSubject.subscribe(
        data => {
          this.TBLShamelSuddenHoliday_List = data;
          this.Filtered_TBLShamelSuddenHoliday = of(this.TBLShamelSuddenHoliday_List);
        }
      )
  
      if (this.ShameldocumenttypeService.List_ITBLShamelDocumentType == null ||
        this.ShameldocumenttypeService.List_ITBLShamelDocumentType == undefined ||
        this.ShameldocumenttypeService.List_ITBLShamelDocumentType.length == 0)
        this.ShameldocumenttypeService.fill();
      this.ShameldocumenttypeService.List_ITBLShamelDocumentType_BehaviorSubject.subscribe(
        data => {
          this.DocumentType_List = data;
          this.filteredDocumentTypeOptions = of(this.DocumentType_List);
        }
      )
  
      this.BuildForm();
      this.FillArrayUsingService();
  
      if (data!= null  && data.obj!= null && data.id != null &&  data.id > 0) {
        console.log('ddddddddddddddddddddddddddddddd');

        this.id = data.id;
        this.Selected_Employee_SCSuddenHoliday = data.obj;
        console.log(this.Selected_Employee_SCSuddenHoliday);
      }
  
  
  
  
  
  
  
    }
  
  
  
  
    ngOnInit(): void {
  
  
  
    }
  
  
    ngAfterViewInit() {
  
    }
  
    public async FillArrayUsingService()
   {
     try{

      
       
       this.filteredDocumentTypeOptions = this.fcl_documenttype_id.valueChanges
       .pipe(
         startWith(''),        
         map(value => value   && typeof value === 'string'  ? this._Filtered_DocumentType(value) : this.DocumentType_List.slice() )
       );  
     

       this.Filtered_TBLShamelSuddenHoliday = this.fcl_suddenholiday_id.valueChanges
       .pipe(
         startWith(''),        
         map(value => value   && typeof value === 'string'  ? this._Filtered_TBLShamelSuddenHoliday(value) : this.TBLShamelSuddenHoliday_List.slice() )
       );  
     
   
       
     }catch(Exception : any)
     {}


    
      
   

    

   }
  

  
  
   public BuildForm()
   {
    

      this.Form = new UntypedFormGroup({});
      this.fcl_duration   = new UntypedFormControl();
      this.fcl_startdate  = new UntypedFormControl();
      this.fcl_enddate = new UntypedFormControl();

      this.fcl_notes = new UntypedFormControl();
      this.fcl_suddenholiday_id = new UntypedFormControl([Validators.required]);

      this.fcl_document_number = new UntypedFormControl();
      this.fcl_documenttype_id  = new UntypedFormControl();
      this.fcl_document_number  = new UntypedFormControl();
      this.fcl_documentdate   = new UntypedFormControl();      
      this.Form.addControl('duration',this.fcl_duration);
      this.Form.addControl('startdate',this.fcl_startdate);
      this.Form.addControl('enddate',this.fcl_enddate);
      this.Form.addControl('document_number',this.fcl_document_number);
      this.Form.addControl('documenttype_id',this.fcl_documenttype_id);
      this.Form.addControl('document_number',this.fcl_document_number);
      this.Form.addControl('documentdate',this.fcl_documentdate);

      this.Form.addControl('notes',this.fcl_notes);
      this.Form.addControl('suddenholiday_id',this.fcl_suddenholiday_id);


     
   
  }
   //#endregion

   public  _Filtered_TBLShamelSuddenHoliday(value: string): TBLShamelSuddenHoliday[] {    
    if (value)
    {
      const filterValue = value ;
      return this.TBLShamelSuddenHoliday_List.filter(obj =>obj.suddenholiday_name && obj.suddenholiday_name.includes(filterValue) );

    }
    return this.TBLShamelSuddenHoliday_List.slice();
  }
  

  public  _Filtered_DocumentType(value: string): ITBLShamelDocumentType[] {    
    if (value)
    {
      const filterValue = value ;
      return this.DocumentType_List.filter(obj => obj.documenttype_name.includes(filterValue) );

    }
    return this.DocumentType_List.slice();
  }
  
  //#endregion


  //#region SetValue And GetValue Function
  public ClearForm()
  {
    try{
      console.log('ClearForm');
      this.fcl_document_number.reset();
      this.fcl_documentdate.reset();
      this.fcl_documenttype_id.reset();
      this.fcl_duration.reset();
      this.fcl_enddate.reset();
      this.fcl_startdate.reset();
      this.fcl_suddenholiday_id.reset();
      this.fcl_notes.reset();
  }catch(ex: any)
  {

  }
  
  }


  //#region SetValue And GetValue Function
  public SetValue()
  {
    if (this.Selected_Employee_SCSuddenHoliday!= null  &&
       this.Selected_Employee_SCSuddenHoliday.serial!= null  &&
      this.Selected_Employee_SCSuddenHoliday.serial>0)
    {

    
      this.fcl_duration.setValue(this.Selected_Employee_SCSuddenHoliday.duration); 

      if (this.Selected_Employee_SCSuddenHoliday != null &&
          this.Selected_Employee_SCSuddenHoliday.startdate != null )
         this.fcl_startdate.setValue(moment(this.Selected_Employee_SCSuddenHoliday.startdate).toDate() ); 

      if (this.Selected_Employee_SCSuddenHoliday != null &&
          this.Selected_Employee_SCSuddenHoliday.enddate != null )
         this.fcl_enddate.setValue(moment(this.Selected_Employee_SCSuddenHoliday.enddate).toDate()); 


      this.fcl_documenttype_id.setValue(this.Selected_Employee_SCSuddenHoliday.documenttype_id); 
      this.fcl_document_number.setValue(this.Selected_Employee_SCSuddenHoliday.document_number); 

      if (this.Selected_Employee_SCSuddenHoliday != null &&
        this.Selected_Employee_SCSuddenHoliday.documentdate != null )        
        this.fcl_documentdate.setValue(moment(this.Selected_Employee_SCSuddenHoliday.documentdate).toDate() ); 


      this.fcl_suddenholiday_id.setValue(this.Selected_Employee_SCSuddenHoliday.suddenholiday_id)

      this.fcl_notes.setValue(this.Selected_Employee_SCSuddenHoliday.notes);
      
    
    }
  
  }

  public getValue()
  {
    try{

if (this.Selected_Employee_SCSuddenHoliday != null )
{

  this.Selected_Employee_SCSuddenHoliday.id = this.id;
  this.Selected_Employee_SCSuddenHoliday.duration = this.fcl_duration.value;

  if (this.fcl_startdate.value != null )
  this.Selected_Employee_SCSuddenHoliday.enterdate =moment( this.fcl_startdate.value).toDate();

  if (this.fcl_enddate.value != null )
    this.Selected_Employee_SCSuddenHoliday.startdate =moment(this.fcl_enddate.value).toDate();
    
    this.Selected_Employee_SCSuddenHoliday.documenttype_id = this.fcl_documenttype_id.value;        
    this.Selected_Employee_SCSuddenHoliday.document_number = this.fcl_document_number.value;

    if (this.fcl_documentdate.value )
    
    this.Selected_Employee_SCSuddenHoliday.documentdate = moment(this.fcl_documentdate.value).toDate();    
    this.Selected_Employee_SCSuddenHoliday.notes = this.fcl_notes.value    
    this.Selected_Employee_SCSuddenHoliday.suddenholiday_id = this.fcl_suddenholiday_id.value
    
  }
  }catch(ex: any)
  {

  }
  
  }
//#endregion

 




  public OnSelect_DocumentType(event: MatAutocompleteSelectedEvent) {
    console.log('OnSelectStateChange');
    console.log(event.option.value);
    if ( event!= null   &&  this.Selected_Employee_SCSuddenHoliday != null )
      this.Selected_Employee_SCSuddenHoliday.documenttype_id = event.option.value;  
  }


  public OnSelect_SuddenHoliday(event: MatAutocompleteSelectedEvent) {
    console.log('OnSelectStateChange');
    console.log(event.option.value);
    if ( event != null  &&  this.Selected_Employee_SCSuddenHoliday != null  )
      this.Selected_Employee_SCSuddenHoliday.suddenholiday_id = event.option.value;  
  }



  //#endregion


  //#region  Display Display Member
  public displayDocumentTypeProperty(value:string):string  {
    if (value!= null  && this.DocumentType_List != null  && this.DocumentType_List.length >0){     
      let documentType:any = this.DocumentType_List.find(crs => crs.documenttype_id.toString() == value) ;
      if (documentType!= null )
      return documentType.documenttype_name;
    }
    return '';
  }


    //#region  Display Display Member
    public Display_TBLShamelSuddenHoliday(value:string):string  {
      if (value!= null   && this.TBLShamelSuddenHoliday_List!= null && this.TBLShamelSuddenHoliday_List.length >0){     
        let suddenholiday:any = this.TBLShamelSuddenHoliday_List.find(crs => crs.suddenholiday_id != null  && crs.suddenholiday_id.toString() == value) ;
        if (suddenholiday!= null )
        return suddenholiday.suddenholiday_name;
      }
      return '';
    }






 

  

  public async Save()
  {
 
console.log('1');   
    
    if (!this.Form.valid == true ) {
      return;
    }
    console.log('2');   

    this.getValue();

    console.log(this.Selected_Employee_SCSuddenHoliday);   

    if (this.Selected_Employee_SCSuddenHoliday != null  &&
      (this.Selected_Employee_SCSuddenHoliday.serial == null  ||
      this.Selected_Employee_SCSuddenHoliday.serial<=0))
      {
        console.log('3');   

        this.ShamelSCSuddenHolidayService.add(this.Selected_Employee_SCSuddenHoliday).toPromise().then(res => {
          console.log(res)
          if (res == 1)
        {
          this.ClearForm();
          this.onReset();
        }else
        {



        }
    });
  }
   else if (this.Selected_Employee_SCSuddenHoliday!= null   &&
    this.Selected_Employee_SCSuddenHoliday.serial != null &&
             this.Selected_Employee_SCSuddenHoliday.serial>0)
             {

      this.ShamelSCSuddenHolidayService.update(this.Selected_Employee_SCSuddenHoliday).toPromise().then(res => {
        console.log(res)
        if (res == 1)
        {
          this.ClearForm();
          this.onReset();

        }else
        {
        }
    });

  }
  }


  

  public onReset(): void {
    this.submitted = false;
    this.Form.reset();
  }

/* Handle form errors in Angular 8 */
public errorHandling = (control: string, error: string) => {
  return this.Form.controls[control].hasError(error);
}









}
