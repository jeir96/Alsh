
import { Component, OnInit, Input, Inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { Observable, of, startWith, map } from 'rxjs';
import { ITBLShamelDoctor } from 'src/app/modules/shared/models/employees_department/ITBLShamelDoctor';
import { ITBLShamelDocumentType } from 'src/app/modules/shared/models/employees_department/ITBLShamelDocumentType';
import { ITBLShamelSCHealthHoliday } from 'src/app/modules/shared/models/employees_department/ITBLShamelSCHealthHoliday';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { IGlobalEmployeeList } from 'src/app/modules/shared/services/employees_department/IGlobalEmployeeList';
import { TBLShamelDoctorService } from 'src/app/modules/shared/services/employees_department/tblshamel-doctor.service';
import { TBLShamelSCHealthHolidayService } from 'src/app/modules/shared/services/employees_department/tblshamel-schealth-holiday.service';
import { TblshameldocumenttypeService } from 'src/app/modules/shared/services/employees_department/tblshameldocumenttype.service';
import { EmployeePageService } from '../../pageservice/employee-page-service';
const moment = _moment;

@Component({
  selector: 'app-tblshamelschealthholiday-modify',
  templateUrl: './tblshamelschealthholiday-modify.component.html',
  styleUrls: ['./tblshamelschealthholiday-modify.component.scss']
})
export class TblshamelschealthholidayModifyComponent implements OnInit {
  id: number;
  Selected_Emp: TBLShamelEmployee = {};
  _Selected_Employee_SCHealthHoliday: ITBLShamelSCHealthHoliday
  @Input() set Selected_Employee_SCHealthHoliday(obj: ITBLShamelSCHealthHoliday) {
    this._Selected_Employee_SCHealthHoliday = obj;
    console.log('بلش');

    if (this._Selected_Employee_SCHealthHoliday != null &&
      this._Selected_Employee_SCHealthHoliday != undefined) {
      console.log('سث');
      console.log(this._Selected_Employee_SCHealthHoliday);
      this.SetValue();
    }
  }

  get Selected_Employee_SCHealthHoliday(): ITBLShamelSCHealthHoliday {
    return this._Selected_Employee_SCHealthHoliday;
  }
  
  
  Doctor_List :ITBLShamelDoctor[]=[];
  filteredDoctorOptions: Observable<ITBLShamelDoctor[]>;  

  DocumentType_List :ITBLShamelDocumentType[]=[];
  filteredDocumentTypeOptions: Observable<ITBLShamelDocumentType[]>;

 
  
  // Access To Element in Form
  Form: UntypedFormGroup ;
  duration   = new UntypedFormControl();
  startdate = new UntypedFormControl();
  enddate = new UntypedFormControl();
  sick = new UntypedFormControl();
  doctor_id= new UntypedFormControl();
  documenttype_id = new UntypedFormControl();
  document_number = new UntypedFormControl();
  documentdate = new UntypedFormControl();

  //Local Var

  submitted = false;
  loading: boolean = false;

  //#region Constuctor 
  constructor(    
    @Inject(MAT_DIALOG_DATA) public data: {obj: ITBLShamelSCHealthHoliday,id:number},
    public GlobalList:IGlobalEmployeeList,

    public ShamelHealthHolidayService:TBLShamelSCHealthHolidayService,    
    public ShamelDoctorService:TBLShamelDoctorService,
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
  
      if (this.ShamelDoctorService.List_TBLShamelDoctor == null ||
        this.ShamelDoctorService.List_TBLShamelDoctor == undefined ||
        this.ShamelDoctorService.List_TBLShamelDoctor.length == 0)
        this.ShamelDoctorService.fill();
      this.ShamelDoctorService.List_TBLShamelDoctor_BehaviorSubject.subscribe(
        data => {
          this.Doctor_List = data;
          this.filteredDoctorOptions = of(this.Doctor_List);
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
  

      if (data!= null  && data.obj!= null && data.id!= null && data.id> 0) {

        this.id = data.id;
        this.Selected_Employee_SCHealthHoliday = data.obj;
      }
  
  
  
  
  
  
  
    }
  
  
  
  
    ngOnInit(): void {
  
  
  
    }
  
  
    ngAfterViewInit() {
  
    }
  
  
  
  
    public async FillArrayUsingService()
   {
     try{

      
       
       this.filteredDocumentTypeOptions = this.documenttype_id.valueChanges
       .pipe(
         startWith(''),        
         map(value => value   && typeof value === 'string'  ? this._filteredDocumentType(value) : this.DocumentType_List.slice() )
       );  
     

       this.filteredDoctorOptions = this.doctor_id.valueChanges
       .pipe(
         startWith(''),        
         map(value => value   && typeof value === 'string'  ? this._filteredDoctor(value) : this.Doctor_List.slice() )
       );  
     
   
       
     }catch(Exception : any)
     {}


    
      
   

    

   }
  

    //#region Filter Of  

    private _filteredDoctor(value: string): ITBLShamelDoctor[] {    
      if (value)
      {
      const filterValue = value ;
      return this.Doctor_List.filter(obj => obj.doctor_name.includes(filterValue) );
      }
      return this.Doctor_List.slice();
    }
  
    private _filteredDocumentType(value: string): ITBLShamelDocumentType[] {    
      if (value)
      {
        const filterValue = value ;
        return this.DocumentType_List.filter(obj => obj.documenttype_name.includes(filterValue) );
  
      }
      return this.DocumentType_List.slice();
    }
    
    //#endregion

   public BuildForm()
   {
     try{  
   

      this.duration   = new UntypedFormControl([Validators.required]);
      this.startdate  = new UntypedFormControl( [ Validators.required ]);
      this.enddate = new UntypedFormControl([ Validators.required ]);
      this.document_number = new UntypedFormControl();
      this.doctor_id  = new UntypedFormControl();
      this.documenttype_id   = new UntypedFormControl();
      this.document_number   = new UntypedFormControl();      
      this.documentdate = new UntypedFormControl();
      this.sick = new UntypedFormControl();

    

      this.Form = this.fb.group({
        });
        this.Form .addControl('duration',this.duration);        
        this.Form .addControl('startdate',this.startdate);
        this.Form .addControl('enddate',this.enddate);
        this.Form .addControl('sick',this.sick);
        this.Form .addControl('doctor_id',this.doctor_id);
        
        this.Form .addControl('documenttype_id',this.documenttype_id);
        this.Form .addControl('documentdate',this.documentdate);        
        this.Form .addControl('document_number',this.document_number);
        
      }catch(Exception:any){
        console.log(Exception);
      }
   }
   //#endregion


  


  //#region SetValue And GetValue Function
  public ClearForm()
  {
    try{
      console.log('ClearForm');
      this.duration.reset();
      this.startdate.reset();
      this.enddate.reset();
      this.doctor_id.reset();
      this.documentdate.reset();
      this.document_number.reset();
      this.documenttype_id.reset();    
      this.sick.reset();    

  }catch(ex: any)
  {

  }
  
  }


  //#region SetValue And GetValue Function
  public SetValue()
  {
    try{
    

      if (this.Selected_Employee_SCHealthHoliday != null) {

this.doctor_id.setValue( this.Selected_Employee_SCHealthHoliday.doctor_id);

this.sick.setValue( this.Selected_Employee_SCHealthHoliday.sick);


this.duration.setValue(this.Selected_Employee_SCHealthHoliday.duration);

if (this.Selected_Employee_SCHealthHoliday.startdate!= null && this.Selected_Employee_SCHealthHoliday.startdate != undefined)        
this.startdate.setValue(moment(this.Selected_Employee_SCHealthHoliday.startdate).toDate());

if (this.Selected_Employee_SCHealthHoliday.enddate!= null && this.Selected_Employee_SCHealthHoliday.enddate != undefined)        
this.enddate.setValue(moment(this.Selected_Employee_SCHealthHoliday.enddate).toDate());


this.documenttype_id.setValue(this.Selected_Employee_SCHealthHoliday.documenttype_id);  

if (this.Selected_Employee_SCHealthHoliday.documentdate!= null && this.Selected_Employee_SCHealthHoliday.documentdate != undefined)        
this.documentdate.setValue(moment(this.Selected_Employee_SCHealthHoliday.documentdate).toDate());


this.document_number.setValue(this.Selected_Employee_SCHealthHoliday.document_number);

this.doctor_id.setValue(this.Selected_Employee_SCHealthHoliday.doctor_id);

   

 

this.doctor_id.setValue( this.Selected_Employee_SCHealthHoliday.doctor_id);

this.duration.setValue(this.Selected_Employee_SCHealthHoliday.duration);
this.documenttype_id.setValue(this.Selected_Employee_SCHealthHoliday.documenttype_id);    
this.document_number.setValue(this.Selected_Employee_SCHealthHoliday.document_number);
      }

  

  }catch(ex: any)
  {
    console.log(ex);

  }
  
  }

  public getValue()
  {
    try{

if (this.Selected_Employee_SCHealthHoliday!= null  )
{
 
  this.Selected_Employee_SCHealthHoliday.id = this.id;
    this.Selected_Employee_SCHealthHoliday.doctor_id = this.doctor_id.value;
    this.Selected_Employee_SCHealthHoliday.duration = this.duration.value;
    this.Selected_Employee_SCHealthHoliday.sick= this.sick.value;



    if (this.enddate.value!= null && this.enddate.value != undefined)        
    this.Selected_Employee_SCHealthHoliday.enddate =moment(this.enddate.value ).toDate(); 

    if (this.startdate.value!= null && this.startdate.value != undefined)        
    this.Selected_Employee_SCHealthHoliday.startdate =  moment(this.startdate.value).toDate();

    this.Selected_Employee_SCHealthHoliday.documenttype_id = this.documenttype_id.value;        
    this.Selected_Employee_SCHealthHoliday.document_number = this.document_number.value;

    if (this.documentdate.value!= null && this.documentdate.value != undefined)        
    this.Selected_Employee_SCHealthHoliday.documentdate = moment(this.documentdate.value).toDate();
    
    
  }
  }catch(ex: any)
  {

  }
  
  }
//#endregion

 

  //#region OnSelect Function

  public OnSelectDoctorChange(event: MatAutocompleteSelectedEvent) {
    if (event  && this.Selected_Employee_SCHealthHoliday )
      this.Selected_Employee_SCHealthHoliday.doctor_id = event.option.value;  
  }


  public OnSelectDocumentTypeChange(event: MatAutocompleteSelectedEvent) {
    console.log('OnSelectStateChange');
    console.log(event.option.value);
    if ( event  &&  this.Selected_Employee_SCHealthHoliday )
      this.Selected_Employee_SCHealthHoliday.documenttype_id = event.option.value;  
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


  public displayDoctorProperty(value:string):string  {
    if (value && this.Doctor_List ){

      let freeholidayreason:any = this.Doctor_List.find(spec => spec.doctor_name.toString() == value) ;
      if (freeholidayreason )
      return freeholidayreason.freeholidayreason_name;
    }
    return '';
  }




 

  public ClearObject()
  {
    if (!this.Selected_Employee_SCHealthHoliday)
    this.Selected_Employee_SCHealthHoliday ={};
  
    this.Selected_Employee_SCHealthHoliday.id= this.id ; 
  }

  public async Save()
  {
 
    console.log(this.Form.valid);
    if (this.Form.valid == false) {
      return;
    }
    if (!this.ValidateForm() == true) {
      return;
    }
    this.getValue();

    if (this.Selected_Employee_SCHealthHoliday != null &&
      this.Selected_Employee_SCHealthHoliday != undefined &&
      (this.Selected_Employee_SCHealthHoliday.serial == null || this.Selected_Employee_SCHealthHoliday.serial <= 0)
    ) {
        this.ShamelHealthHolidayService.add(this.Selected_Employee_SCHealthHoliday).toPromise().then(res => {
          console.log(res)
          if (res == 1)
        {
          this.ClearObject();
          this.ClearForm();
        }else
        {



        }
    });
  }
  else if (this.Selected_Employee_SCHealthHoliday != null &&
    this.Selected_Employee_SCHealthHoliday != undefined &&
    this.Selected_Employee_SCHealthHoliday.serial != null &&
    this.Selected_Employee_SCHealthHoliday.serial > 0) {
               console.log('update');
               console.log(this.Selected_Employee_SCHealthHoliday);

      this.ShamelHealthHolidayService.update(this.Selected_Employee_SCHealthHoliday).toPromise().then(res => {
        console.log(res)
        if (res == 1)
        {
          this.ClearObject();
          this.ClearForm();

        }else
        {
        }
    });

  }
  }


  public ValidateForm():boolean
  {
    let result : boolean = true;


/*
    if (!this.doctor_id.value || this.doctor_id.value <=0)
    {
      console.log('error1');
      this.doctor_id.setErrors({ invalid: true ,required:true});
      result = false;
      
    }
  */    
    
    
    

    console.log("result vaildarw"+result);
    return result;
    
  }

  public onReset(): void {
    this.submitted = false;
    this.Form.reset();
  }
/* Handle form errors in Angular 8 */
public errorHandling = (control: string, error: string) => {
  return this.Form.controls[control].hasError(error);
}



addEventDocumentDate(type: string, event: MatDatepickerInputEvent<Date>) {
  if (event.value!= null &&
      this.Selected_Employee_SCHealthHoliday != null)
  this.Selected_Employee_SCHealthHoliday.documentdate = moment(event.value).toDate();

}


addEventStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
  if (event.value!= null &&
      this.Selected_Employee_SCHealthHoliday != null)
  this.Selected_Employee_SCHealthHoliday.startdate = moment(event.value).toDate();

}



addEventEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
  if (event.value!= null &&
     this.Selected_Employee_SCHealthHoliday != null )
  this.Selected_Employee_SCHealthHoliday.enddate = moment(event.value).toDate();

}



}
