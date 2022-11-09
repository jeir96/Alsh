
import { Component, OnInit, AfterViewInit, Input, Inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { Observable, of, startWith, map } from 'rxjs';
import { ITBLShamelDocumentType } from 'src/app/modules/shared/models/employees_department/ITBLShamelDocumentType';
import { ITBLShamelPunishment } from 'src/app/modules/shared/models/employees_department/ITBLShamelPunishment';
import { ITBLShamelPunishmentReason } from 'src/app/modules/shared/models/employees_department/ITBLShamelPunishmentReason';
import { ITBLShamelSCCancelPunishment } from 'src/app/modules/shared/models/employees_department/ITBLShamelSCCancelPunishment';
import { ITBLShamelSCPunishment } from 'src/app/modules/shared/models/employees_department/ITBLShamelSCPunishment';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { IGlobalEmployeeList } from 'src/app/modules/shared/services/employees_department/IGlobalEmployeeList';
import { TBLShamelPunishmentReasonService } from 'src/app/modules/shared/services/employees_department/tblshamel-punishment-reason.service';
import { TBLShamelPunishmentService } from 'src/app/modules/shared/services/employees_department/tblshamel-punishment.service';
import { TBLShamelSCCancelPunishmentService } from 'src/app/modules/shared/services/employees_department/tblshamel-sccancel-punishment.service';
import { TblshameldocumenttypeService } from 'src/app/modules/shared/services/employees_department/tblshameldocumenttype.service';
import { EmployeePageService } from '../../employee-page-service';
const moment = _moment;


@Component({
  selector: 'app-tblshamelsccancelpunishmentmodify',
  templateUrl: './tblshamelsccancelpunishmentmodify.component.html',
  styleUrls: ['./tblshamelsccancelpunishmentmodify.component.scss']
})
export class TblshamelsccancelpunishmentmodifyComponent implements OnInit,AfterViewInit {
id: number;
Selected_Emp: TBLShamelEmployee = {};
_Selected_Employee_SCCancelPunishment: ITBLShamelSCCancelPunishment;
@Input() set Selected_Employee_SCCancelPunishment(obj: ITBLShamelSCCancelPunishment) {
  this._Selected_Employee_SCCancelPunishment = obj;
  console.log('بلش');

  if (this._Selected_Employee_SCCancelPunishment != null &&
    this._Selected_Employee_SCCancelPunishment != undefined) {
    console.log('سث');
    console.log(this._Selected_Employee_SCCancelPunishment);
    this.SetValue();
  }
}

get Selected_Employee_SCCancelPunishment(): ITBLShamelSCCancelPunishment {
  return this._Selected_Employee_SCCancelPunishment;
}
 

_Selected_Employee_SCPunishment :ITBLShamelSCPunishment;
@Input() set Selected_Employee_SCPunishment(obj: ITBLShamelSCPunishment) {
  this._Selected_Employee_SCPunishment = obj;
  console.log('بلش');

  if (this._Selected_Employee_SCPunishment != null &&
    this._Selected_Employee_SCPunishment != undefined &&
    this._Selected_Employee_SCPunishment.TBLShamelSCCancelPunishment != undefined &&
    this._Selected_Employee_SCPunishment.TBLShamelSCCancelPunishment != null  ) {
      this.Selected_Employee_SCCancelPunishment  = this._Selected_Employee_SCPunishment.TBLShamelSCCancelPunishment;
  }
}

get Selected_Employee_SCPunishment(): ITBLShamelSCPunishment {
  return this._Selected_Employee_SCPunishment;
}



  
  TBLShamelPunishment_List :ITBLShamelPunishment[]=[];
  filteredPunishmentOptions: Observable<ITBLShamelPunishment[]>;

  TBLShamelPunishmentReason_List :ITBLShamelPunishmentReason[]=[];
  filteredPunishmentReasonOptions: Observable<ITBLShamelPunishmentReason[]>;
  

  DocumentType_List :ITBLShamelDocumentType[]=[];
  filteredDocumentTypeOptions: Observable<ITBLShamelDocumentType[]>;


  
  // Access To Element in Form
  Form: UntypedFormGroup ;
  punishment_id   = new UntypedFormControl();
  reason_id = new UntypedFormControl();
  documenttype_id = new UntypedFormControl();
  document_number = new UntypedFormControl();
  documentdate = new UntypedFormControl();
 

  //Local Var

  submitted = false;
  loading: boolean = false;

  //#region Constuctor 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {Parent:ITBLShamelSCPunishment , obj:ITBLShamelSCCancelPunishment ,id:number},
    public GlobalList:IGlobalEmployeeList,
    public SCCancelPunishmentService:TBLShamelSCCancelPunishmentService,
    public ShamelPunishmentService:TBLShamelPunishmentService,    
    public PunishmentReasonService:TBLShamelPunishmentReasonService,    
    public ShameldocumenttypeService:TblshameldocumenttypeService ,
    private fb: UntypedFormBuilder,
    public PageService: EmployeePageService
  ) {


    this.PageService.Subject_Selected_TBLShamelEmployee.subscribe(
      data => {
        this.Selected_Emp = data;
        this.id = this.Selected_Emp.id;
      }
    )

    if (this.ShamelPunishmentService.List_ITBLShamelPunishment == null ||
      this.ShamelPunishmentService.List_ITBLShamelPunishment== undefined ||
      this.ShamelPunishmentService.List_ITBLShamelPunishment.length == 0)
      this.ShamelPunishmentService.fill();
    this.ShamelPunishmentService.List_ITBLShamelPunishment_BehaviorSubject.subscribe(
      data => {
        this.TBLShamelPunishment_List= data;
        this.filteredPunishmentOptions = of(this.TBLShamelPunishment_List);
      }
    )

    if (this.PunishmentReasonService.List_ITBLShamelPunishmentReason == null ||
      this.PunishmentReasonService.List_ITBLShamelPunishmentReason== undefined ||
      this.PunishmentReasonService.List_ITBLShamelPunishmentReason.length == 0)
      this.PunishmentReasonService.fill();
    this.PunishmentReasonService.List_ITBLShamelPunishmentReason_BehaviorSubject.subscribe(
      data => {
        this.TBLShamelPunishmentReason_List = data;
        this.filteredPunishmentReasonOptions = of(this.TBLShamelPunishmentReason_List);
      }
    )


    if (this.ShameldocumenttypeService.List_ITBLShamelDocumentType == null ||
      this.ShameldocumenttypeService.List_ITBLShamelDocumentType== undefined ||
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

    if (data && data.obj && data.id > 0) {
      this.id = data.id;
      this.Selected_Employee_SCCancelPunishment = data.obj;

    }
  
   }
   //#endregion

   //#region  Init Component

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
     
     }catch(Exception : any)
     {}


     try{
      
      this.filteredPunishmentOptions = this.punishment_id.valueChanges
      .pipe(
        startWith(''),        
        map(value => value   && typeof value === 'string'  ? this._filteredPunishment(value) : this.TBLShamelPunishment_List.slice() )
      );  
    
    }catch(Exception : any)
    {}


    try{
      
      this.filteredPunishmentReasonOptions = this.reason_id.valueChanges
      .pipe(
        startWith(''),        
        map(value => value   && typeof value === 'string'  ? this._filteredPunishmentReason(value) : this.TBLShamelPunishmentReason_List.slice() )
      );  
    
    }catch(Exception : any)
    {}

   }
  
   public BuildForm()
   {
     try{  

      this.punishment_id   = new UntypedFormControl([Validators.required]);
      this.reason_id  = new UntypedFormControl( );
      this.documenttype_id = new UntypedFormControl();
      this.document_number = new UntypedFormControl();            
      this.documentdate = new UntypedFormControl();

    
      this.Form = this.fb.group({
        });

        this.Form .addControl('punishment_id',this.punishment_id);        
        this.Form .addControl('reason_id',this.reason_id);
        this.Form .addControl('documenttype_id',this.documenttype_id);
        this.Form .addControl('document_number',this.document_number);
        this.Form .addControl('documentdate',this.documentdate);              
        
      }catch(Exception:any){
        console.log(Exception);
      }
   }
   //#endregion


   //#region Filter Of  

   private _filteredPunishment(value: string): ITBLShamelPunishment[] {  
     console.log('_filteredPunishment');  
    if (value)
    {
    const filterValue = value ;
    return this.TBLShamelPunishment_List.filter(obj => obj.punishment_name.includes(filterValue) );
    }
    return this.TBLShamelPunishment_List.slice();
  }

   private _filteredPunishmentReason(value: string): ITBLShamelPunishmentReason[] {    
    if (value)
    {
    const filterValue = value ;
    return this.TBLShamelPunishmentReason_List.filter(obj => obj.punishmentreason_name.includes(filterValue) );
    }
    return this.TBLShamelPunishmentReason_List.slice();
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


  //#region SetValue And GetValue Function
  public ClearForm()
  {
    try{

      this.punishment_id.reset();
      this.reason_id.reset();
      this.documenttype_id.reset();
    
      this.documentdate.reset();
      this.document_number.reset();
     

  }catch(ex: any)
  {

  }
  
  }


  //#region SetValue And GetValue Function
  public SetValue()
  {
    try{
      
if (this.Selected_Employee_SCPunishment != null &&
  this.Selected_Employee_SCPunishment != undefined )
{
  
  

this.reason_id.setValue( this.Selected_Employee_SCCancelPunishment .reason_id);

this.reason_id.setValue(this.Selected_Employee_SCCancelPunishment .reason_id);

this.documenttype_id.setValue(this.Selected_Employee_SCCancelPunishment .documenttype_id);    

if (this.Selected_Employee_SCCancelPunishment .documentdate != null &&
  this.Selected_Employee_SCCancelPunishment .documentdate != undefined )
  this.documentdate.setValue(moment(this.Selected_Employee_SCCancelPunishment .documentdate));

this.document_number.setValue(this.Selected_Employee_SCCancelPunishment .document_number);

this.reason_id.setValue(this.Selected_Employee_SCCancelPunishment .reason_id);

   


  }

  }catch(ex: any)
  {
    console.log(ex);

  }
  
  }

  public getValue()
  {
    try{

if (this.Selected_Employee_SCCancelPunishment != null &&
  this.Selected_Employee_SCCancelPunishment != undefined  )
{

  this.Selected_Employee_SCCancelPunishment .id = this.id;
  this.Selected_Employee_SCCancelPunishment .punishment_id = this.punishment_id.value;
  this.Selected_Employee_SCCancelPunishment .reason_id = this.reason_id.value;
   
  this.Selected_Employee_SCCancelPunishment .documenttype_id = this.documenttype_id.value;        
  this.Selected_Employee_SCCancelPunishment .document_number = this.document_number.value;

  if (this.documentdate.value != null && this.documentdate.value != undefined)
    this.Selected_Employee_SCCancelPunishment .documentdate = moment(this.documentdate.value).toDate();
  this.Selected_Employee_SCCancelPunishment .serial_punishment = this.Selected_Employee_SCPunishment .serial;
    
  }
  }catch(ex: any)
  {

  }
  
  }
//#endregion

 

  //#region OnSelect Function

  public OnSelectPunishmentReasonChange(event: MatAutocompleteSelectedEvent) {
    console.log('OnSelectPunishmentReasonChange');
    if (event  && this.Selected_Employee_SCCancelPunishment )
    this.Selected_Employee_SCCancelPunishment.reason_id = event.option.value;  
  }

  public OnSelectPunishmentChange(event: MatAutocompleteSelectedEvent) {
    console.log('OnSelectPunishmentChange');
    if (event  && this.Selected_Employee_SCCancelPunishment )
    this.Selected_Employee_SCCancelPunishment.punishment_id = event.option.value;  
  }


  public OnSelectDocumentTypeChange(event: MatAutocompleteSelectedEvent) {
    console.log('OnSelectStateChange');
    console.log(event.option.value);
    if ( event  &&  this.Selected_Employee_SCCancelPunishment )
    this.Selected_Employee_SCCancelPunishment.documenttype_id = event.option.value;  
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


  public displayPunishmentReasonProperty(value:string):string  {
    if (value && this.TBLShamelPunishmentReason_List){     
      let punishmentreason:any = this. TBLShamelPunishmentReason_List.find(crs => crs.punishmentreason_id.toString() == value) ;
      if (punishmentreason)
      return punishmentreason.punishmentreason_name;
    }
    return '';
  }


  public displayPunishmentProperty(value:string):string  {
    console.log('displayPunishmentProperty');
    console.log(value);

    if (value && this.TBLShamelPunishment_List ){

      let ShamelPunishment:any = this.TBLShamelPunishment_List.find(spec => spec.punishment_id.toString() == value) ;
      if (ShamelPunishment )
      return ShamelPunishment.punishment_name;
    }
    return '';
  }




 

  public ClearObject()
  {
    if (!this.Selected_Employee_SCCancelPunishment )
    this.Selected_Employee_SCCancelPunishment  ={};
 
    this.Selected_Employee_SCCancelPunishment.id= this.id ; 
    this.Selected_Employee_SCCancelPunishment.serial_punishment= this.Selected_Employee_SCPunishment.serial; 
  }

  public async Save()
  {
 
   
    if (!this.Form.valid) {
      return;
    }
    if (!this.ValidateForm() == true) {
      return;
    }
    this.getValue();

    if (this.Selected_Employee_SCCancelPunishment != null  &&
      this.Selected_Employee_SCCancelPunishment != undefined  &&
      (this.Selected_Employee_SCCancelPunishment.serial == null || this.Selected_Employee_SCCancelPunishment.serial<=0)
      )
      {
        this.SCCancelPunishmentService.add(this.Selected_Employee_SCCancelPunishment).toPromise().then(res => {
          console.log(res)
          if (res == 1)
        {
          this.ClearObject();
          this.ClearForm();
        }else
        {



        }
    });
  }    if (this.Selected_Employee_SCCancelPunishment != null  &&
    this.Selected_Employee_SCCancelPunishment != undefined  &&
    this.Selected_Employee_SCCancelPunishment.serial != null &&
    this.Selected_Employee_SCCancelPunishment.serial>0
    )
    {


      this.SCCancelPunishmentService.update(this.Selected_Employee_SCCancelPunishment).toPromise().then(res => {
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


  public ValidateForm():boolean
  {
    let result : boolean = true;



      
    if (this.punishment_id.value == null   || this.punishment_id.value<=0)
    {
      console.log('error2');
      this.reason_id.setErrors({'Phone Number does not exist.': true});
      result = false;

    }

    

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

  console.log('addEventDocumentDate');
  console.log(event.value);
  if (event.value != null &&
    event.value != undefined)
  this.Selected_Employee_SCCancelPunishment.documentdate = moment(event.value).toDate();
  console.log('addEventDocumentDate');

}







}
