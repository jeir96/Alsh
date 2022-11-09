import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Observable, of, startWith, map } from 'rxjs';
import { ITBLShamelDocumentType } from 'src/app/modules/shared/models/employees_department/ITBLShamelDocumentType';
import { TBLShamelSCLegalHoliday } from 'src/app/modules/shared/models/employees_department/TBLShamelSCLegalHoliday';
import { TBLShamelSCMergeService } from 'src/app/modules/shared/models/employees_department/TBLShamelSCMergeService';
import { TBLShamelSCLEgalHolidayService } from 'src/app/modules/shared/services/employees_department/tblshamel-sc-legal-holiday.service';
import { TblshameldocumenttypeService } from 'src/app/modules/shared/services/employees_department/tblshameldocumenttype.service';
import { EmployeePageService } from '../../pageservice/employee-page-service';

@Component({
  selector: 'app-tblshamel-sc-legal-holiday-add',
  templateUrl: './tblshamel-sc-legal-holiday-add.component.html',
  styleUrls: ['./tblshamel-sc-legal-holiday-add.component.scss']
})
export class TBLShamelSCLEgalHolidayAddComponent implements OnInit {


  id: number;
  Selected_Emp: TBLShamelSCLegalHoliday = {};
  _Selected_Employee_SCLegalHoliday: TBLShamelSCLegalHoliday
  @Input() set Selected_Employee_SCLegalHoliday(obj: TBLShamelSCLegalHoliday) {
    this._Selected_Employee_SCLegalHoliday = obj;
    console.log('بلش');

    if (this._Selected_Employee_SCLegalHoliday != null &&
      this._Selected_Employee_SCLegalHoliday != undefined) {
      console.log('سث');
      console.log(this._Selected_Employee_SCLegalHoliday);
      this.SetValue();
    }
  }

  get Selected_Employee_SCLegalHoliday(): TBLShamelSCLegalHoliday {
    return this._Selected_Employee_SCLegalHoliday;
  }

  

  //Array Of AutoComplere With Filter
  
  DocumentType_List :ITBLShamelDocumentType[]=[];
  filteredDocumentTypeOptions: Observable<ITBLShamelDocumentType[]>;

  // Access To Element in Form
  Form: UntypedFormGroup ;
  fcl_duration   = new UntypedFormControl();
  fcl_startdate  = new UntypedFormControl();
  fcl_enddate  = new UntypedFormControl();
  fcl_documenttype_id   = new UntypedFormControl();  
  fcl_document_number  = new UntypedFormControl();
  fcl_documentdate = new UntypedFormControl();

  //Local Var

  submitted = false;
  loading: boolean = false;

  //#region Constuctor 
  constructor(    
    @Inject(MAT_DIALOG_DATA) public data: {obj: TBLShamelSCMergeService,id:number},
    public ShamelSCLEgalHolidayService:TBLShamelSCLEgalHolidayService,
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

    console.log(data.obj);
    console.log(data.id);

    if (data!= null  && data.obj!= null && data.id!= null && data.id> 0) {
      console.log('ddd دخل ');
      this.id = data.id;
      this.Selected_Employee_SCLegalHoliday = data.obj;
    }







  }




  ngOnInit(): void {



  }


  ngAfterViewInit() {

  }

  
  public async FillArrayUsingService() {
    try {
      this.filteredDocumentTypeOptions = this.fcl_documenttype_id.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._Filtered_DocumentType(value) : this.DocumentType_List.slice())
        );

    } catch (Exception: any) { }


  
    




  }
  
  private _filteredDocumentType(value: string): ITBLShamelDocumentType[] {
    if (value) {
      const filterValue = value;
      return this.DocumentType_List.filter(obj => obj.documenttype_name.includes(filterValue));

    }
    return this.DocumentType_List.slice();
  }

   public BuildForm()
   {
    

      this.Form = new UntypedFormGroup({});
      this.fcl_duration   = new UntypedFormControl();
      this.fcl_startdate  = new UntypedFormControl();
      this.fcl_enddate = new UntypedFormControl();
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

    

     
   
  }
   //#endregion


  

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
  }catch(ex: any)
  {

  }
  
  }


  //#region SetValue And GetValue Function
  public SetValue()
  {
    if (this.Selected_Employee_SCLegalHoliday && this.Selected_Employee_SCLegalHoliday.serial &&
      this.Selected_Employee_SCLegalHoliday.serial>0)
    {
      this.fcl_duration.setValue( this.Selected_Employee_SCLegalHoliday.duration);           

      if (this.Selected_Employee_SCLegalHoliday.startdate!= null && this.Selected_Employee_SCLegalHoliday.startdate != undefined)        
      this.fcl_startdate.setValue( moment(this.Selected_Employee_SCLegalHoliday.startdate).toDate() ); 

      if (this.Selected_Employee_SCLegalHoliday.enddate!= null && this.Selected_Employee_SCLegalHoliday.enddate != undefined)        
      this.fcl_enddate.setValue(moment(this.Selected_Employee_SCLegalHoliday.enddate).toDate()); 


      this.fcl_documenttype_id.setValue(this.Selected_Employee_SCLegalHoliday.documenttype_id); 
      this.fcl_document_number.setValue(this.Selected_Employee_SCLegalHoliday.document_number); 

      if (this.Selected_Employee_SCLegalHoliday.documentdate!= null && this.Selected_Employee_SCLegalHoliday.documentdate != undefined)        
        this.fcl_documentdate.setValue(moment(this.Selected_Employee_SCLegalHoliday.documentdate).toDate());         
    }
  
  }

  public getValue()
  {
    try{

if (this.Selected_Employee_SCLegalHoliday != null )
{

  this.Selected_Employee_SCLegalHoliday.id = this.Selected_Emp.id;

  this.Selected_Employee_SCLegalHoliday.duration = this.fcl_duration.value;

  if (this.fcl_startdate.value != null )
  this.Selected_Employee_SCLegalHoliday.startdate =moment( this.fcl_startdate.value).toDate();

  if (this.fcl_enddate.value != null )
    this.Selected_Employee_SCLegalHoliday.enddate =moment(this.fcl_enddate.value).toDate();
    
    this.Selected_Employee_SCLegalHoliday.documenttype_id = this.fcl_documenttype_id.value;        
    this.Selected_Employee_SCLegalHoliday.document_number = this.fcl_document_number.value;
    
    if (this.fcl_documentdate.value != null )
    this.Selected_Employee_SCLegalHoliday.documentdate = moment(this.fcl_documentdate.value).toDate();
    
    
  }
  }catch(ex: any)
  {

  }
  
  }
//#endregion

 




  public OnSelect_DocumentType(event: MatAutocompleteSelectedEvent) {
    console.log('OnSelectStateChange');
    console.log(event.option.value);
    if ( event  &&  this.Selected_Employee_SCLegalHoliday )
      this.Selected_Employee_SCLegalHoliday.documenttype_id = event.option.value;  
  }

  

  //#endregion


  //#region  Display Display Member
  public displayDocumentTypeProperty(value:string):string  {
    if (value && this.DocumentType_List){     
      let documentType:any = this.DocumentType_List.find(crs => crs.documenttype_id.toString() == value) ;
      if (documentType)
      return documentType.documenttype_name;
    }
    return '';
  }







 

  

  public async Save()
  {
 
    console.log('1');
    if (this.Form.valid == false ) {
      console.log('2');
      return;
    }
    console.log(this.Selected_Employee_SCLegalHoliday);
    this.getValue();

    if (this.Selected_Employee_SCLegalHoliday != null  &&
      (this.Selected_Employee_SCLegalHoliday.serial == null ||
        this.Selected_Employee_SCLegalHoliday.serial == undefined ||
      this.Selected_Employee_SCLegalHoliday.serial<=0))
      {
        console.log('3');

        this.ShamelSCLEgalHolidayService.add(this.Selected_Employee_SCLegalHoliday).toPromise().then(res => {
          console.log(res)
          if (res == 1)
        {
          this.ClearForm();
          

        }else
        {



        }
    });
  }
   else if (this.Selected_Employee_SCLegalHoliday != null &&
    this.Selected_Employee_SCLegalHoliday.serial != null&&
             this.Selected_Employee_SCLegalHoliday.serial>0)
             {

      this.ShamelSCLEgalHolidayService.update(this.Selected_Employee_SCLegalHoliday).toPromise().then(res => {
        console.log(res)
        if (res == 1)
        {
          this.getValue();

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
