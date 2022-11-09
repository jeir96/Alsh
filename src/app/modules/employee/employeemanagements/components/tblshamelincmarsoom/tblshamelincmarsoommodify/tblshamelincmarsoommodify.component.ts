import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';



import * as moment from 'moment';
import { map, startWith } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ITBLShamelChangeReason } from 'src/app/modules/shared/models/employees_department/ITBLShamelChangeReason';
import { ITBLShamelDocumentType } from 'src/app/modules/shared/models/employees_department/ITBLShamelDocumentType';
import { ITBLShamelIncMarsoom } from 'src/app/modules/shared/models/employees_department/ITBLShamelIncMarsoom';
import { TblshamelchangereasonService } from 'src/app/modules/shared/services/employees_department/tblshamelchangereason.service';
import { TblshameldocumenttypeService } from 'src/app/modules/shared/services/employees_department/tblshameldocumenttype.service';
import { TblshamelincmarsoomService } from 'src/app/modules/shared/services/employees_department/tblshamelincmarsoom.service';

@Component({
  selector: 'app-tblshamelincmarsoommodify',
  templateUrl: './tblshamelincmarsoommodify.component.html',
  styleUrls: ['./tblshamelincmarsoommodify.component.scss']
})
export class TblshamelincmarsoommodifyComponent implements OnInit,AfterViewInit {


  _Selected_IncMarsoom: ITBLShamelIncMarsoom;
  @Input() set Selected_IncMarsoom(obj: ITBLShamelIncMarsoom) {
    this._Selected_IncMarsoom = obj;
    console.log('بلش');

    if (this._Selected_IncMarsoom != null &&
      this._Selected_IncMarsoom != undefined) {
      console.log('سث');
      console.log(this._Selected_IncMarsoom);
      this.SetValue();
    }
  }

  get Selected_IncMarsoom(): ITBLShamelIncMarsoom {
    return this._Selected_IncMarsoom;
  }



  //Array Of AutoComplere With Filter
  ChangeReason_List :ITBLShamelChangeReason[]=[];
  filteredChangeReasonOptions: Observable<ITBLShamelChangeReason[]>;  

  
  DocumentType_List :ITBLShamelDocumentType[]=[];
  filteredDocumentTypeOptions: Observable<ITBLShamelDocumentType[]>;


  
  // Access To Element in Form
  Form: UntypedFormGroup ;
  incmarsoomdata   = new UntypedFormControl();
  changedate = new UntypedFormControl();
  changereason_id = new UntypedFormControl();
  documenttype_id = new UntypedFormControl();
  document_number = new UntypedFormControl();
  documentdate = new UntypedFormControl();
  begindate = new UntypedFormControl();
  incpercentage = new UntypedFormControl();
  additionalvalue = new UntypedFormControl();
  


  //Local Var

  submitted = false;
  loading: boolean = false;

  //#region Constuctor 
  constructor(
    public dialogRef: MatDialogRef<TblshamelincmarsoommodifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {obj: ITBLShamelIncMarsoom},
    public incmarsoomService:TblshamelincmarsoomService,      
    public changereasonService:TblshamelchangereasonService,      
    public ShameldocumenttypeService:TblshameldocumenttypeService ,
    private fb: UntypedFormBuilder
  ) {

    if (this.changereasonService.List_ITBLShamelChangeReason == null ||
      this.changereasonService.List_ITBLShamelChangeReason == undefined ||
      this.changereasonService.List_ITBLShamelChangeReason.length == 0)
      this.changereasonService.fill();
    this.changereasonService.List_ITBLShamelChangeReason_BehaviorSubject.subscribe(
      data => {
        this.ChangeReason_List = data;
        this.filteredChangeReasonOptions = of(this.ChangeReason_List);
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
    
    if (data!= null  && data.obj!= null ) {
      this.Selected_IncMarsoom = data.obj;
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
     
     }catch(Exception : any)
     {}


     try{

      
      
      this.filteredChangeReasonOptions = this.changereason_id.valueChanges
      .pipe(
        startWith(''),        
        map(value => value   && typeof value === 'string'  ? this._filteredChangeReason(value) : this.ChangeReason_List.slice() )
      );  
    
    }catch(Exception : any)
    {}




   }
  
   public BuildForm()
   {
     try{      
      this.incmarsoomdata   = new UntypedFormControl('',[ Validators.required ]);
      this.changedate = new UntypedFormControl('',[ Validators.required ]);
      this.changereason_id = new UntypedFormControl('',[ Validators.required ]);
      this.begindate = new UntypedFormControl('',[ Validators.required ]);
      this.incpercentage = new UntypedFormControl();
      this.additionalvalue = new UntypedFormControl();
      this.documenttype_id = new UntypedFormControl();
      this.document_number = new UntypedFormControl();      
      this.documentdate = new UntypedFormControl();    

      this.Form = this.fb.group({
        });

        this.Form .addControl('changedate',this.changedate);        
        this.Form .addControl('changereason_id',this.changereason_id);
        this.Form .addControl('documenttype_id',this.documenttype_id);
        this.Form .addControl('documentdate',this.documentdate);        
        this.Form .addControl('document_number',this.document_number);
        this.Form .addControl('begindate',this.begindate);
        this.Form .addControl('incpercentage',this.incpercentage);
        this.Form .addControl('additionalvalue',this.additionalvalue);

  
      }catch(Exception:any){
        console.log(Exception);
      }
   }



   //#region Filter Of  

   private _filteredChangeReason(value: string): ITBLShamelChangeReason[] {    
    if (value)
    {
    const filterValue = value ;
    return this.ChangeReason_List.filter(obj => obj.changereason_name.includes(filterValue) );
    }
    return this.ChangeReason_List.slice();
  }

 
  private _filteredDocumentType(value: string): ITBLShamelDocumentType[] {    
    if (value)
    {
      const filterValue = value ;
      return this.DocumentType_List.filter(obj => obj.documenttype_name.includes(filterValue) );

    }
    return this.DocumentType_List.slice();
  }
  
  public ClearForm()
  {
    try{
      console.log('ClearForm');
      this.changedate.reset();
      this.changereason_id.reset();
      this.documentdate.reset();
      this.document_number.reset();
      this.documenttype_id.reset();    
      this.begindate.reset();    

  }catch(ex: any)
  {

  }
  
  }


  //#region SetValue And GetValue Function
  public SetValue()
  {
    try{
    
      if (this.Selected_IncMarsoom != null && this.Selected_IncMarsoom.incmarsoom_id != null)
{




this.changereason_id.setValue(this.Selected_IncMarsoom.changereason_id);
this.documenttype_id.setValue(this.Selected_IncMarsoom.documenttype_id);    

if (this.Selected_IncMarsoom.documentdate != null && this.Selected_IncMarsoom.documentdate  != undefined)
  this.documentdate.setValue(moment(this.Selected_IncMarsoom.documentdate).toDate());

  if (this.Selected_IncMarsoom.documentdate != null && this.Selected_IncMarsoom.documentdate  != undefined)
this.changedate.setValue(moment(this.Selected_IncMarsoom.changedate).toDate());

if (this.Selected_IncMarsoom.documentdate != null && this.Selected_IncMarsoom.documentdate  != undefined)
this.begindate.setValue(moment(this.Selected_IncMarsoom.begindate).toDate());

this.document_number.setValue(this.Selected_IncMarsoom.document_number);
this.additionalvalue.setValue(this.Selected_IncMarsoom.additionalvalue);
this.incpercentage.setValue(this.Selected_IncMarsoom.incpercentage);

this.changereason_id.setValue(this.Selected_IncMarsoom.changereason_id);
  this.documenttype_id.setValue(this.Selected_IncMarsoom.documenttype_id);    
  
  
  this.document_number.setValue(this.Selected_IncMarsoom.document_number);
  this.additionalvalue.setValue(this.Selected_IncMarsoom.additionalvalue);
  this.incpercentage.setValue(this.Selected_IncMarsoom.incpercentage);
  


   


  }
  

  }catch(ex: any)
  {
    console.log(ex);

  }
  
  }

  public getValue()
  {
    try{

if (this.Selected_IncMarsoom != null && this.Selected_IncMarsoom  != undefined)
{

  if (this.begindate.value != null)
    this.Selected_IncMarsoom.begindate =moment(this.begindate.value).toDate();

    if (this.documentdate.value != null)
    this.Selected_IncMarsoom.documentdate = moment(this.documentdate.value).toDate();

    if (this.changedate.value != null)
    this.Selected_IncMarsoom.changedate = moment(this.changedate.value).toDate();
    


    this.Selected_IncMarsoom.changereason_id = this.changereason_id.value;
    this.Selected_IncMarsoom.documenttype_id = this.documenttype_id.value;        
    this.Selected_IncMarsoom.document_number = this.document_number.value;

    this.Selected_IncMarsoom.incpercentage = this.incpercentage.value;
    this.Selected_IncMarsoom.additionalvalue = this.additionalvalue.value;
    
  }
  }catch(ex: any)
  {

  }
  
  }



  public OnSelectChangeReasonChange(event: MatAutocompleteSelectedEvent) {
  
    if ( event!= null   &&  this.Selected_IncMarsoom != null)
      this.Selected_IncMarsoom.changereason_id = event.option.value;   
  }


  public OnSelectDocumentTypeChange(event: MatAutocompleteSelectedEvent) {
    console.log('OnSelectStateChange');
    console.log(event.option.value);
    if ( event!= null  &&  this.Selected_IncMarsoom != null)
      this.Selected_IncMarsoom.documenttype_id = event.option.value;  
  }

  

  //#endregion


  //#region  Display Display Member
  public displayDocumentTypeProperty(value:string):string  {
    if (value!= null && this.DocumentType_List!= null){     
      let documentType:any = this.DocumentType_List.find(crs => crs.documenttype_id.toString() == value) ;
      if (documentType!= null)
      return documentType.documenttype_name;
    }
    return '';
  }


  public displayChangeReasonProperty(value:string):string  {
    if (value && this.ChangeReason_List ){
      let object:any = this.ChangeReason_List.find(obj => obj.changereason_id.toString() == value) ;
      if (object != null)
      return object.changereason_name;
    }
    return '';
  }




  
 

  public ClearObject()
  {
    if (this.Selected_IncMarsoom!= null)
    this.Selected_IncMarsoom =  {};

  }

  public async Save()
  {
 

    if (this.Form.invalid == true) {
      return;
    }

    if (this.ValidateForm())
    {

    }

    this.getValue();

    if (this.Selected_IncMarsoom != null   &&
      (this.Selected_IncMarsoom.incmarsoom_id== null  ||
      this.Selected_IncMarsoom.incmarsoom_id <=0)
    )
      {


        this.incmarsoomService.add(this.Selected_IncMarsoom).toPromise().then(res => {
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
   else if (this.Selected_IncMarsoom != null   &&
      this.Selected_IncMarsoom.incmarsoom_id!= null  &&
      this.Selected_IncMarsoom.incmarsoom_id >0)
      {
               

      this.incmarsoomService.update(this.Selected_IncMarsoom).toPromise().then(res => {
        console.log(res)
        if (res == 1)
        {
          this.dialogRef.close(1);

        }else
        {
        }
    });

  }
  }


  public ValidateForm():boolean
  {
    let result : boolean = true;

    if (this.changereason_id.value== null  || this.changereason_id.value <=0)
    {
      console.log('error1');
      this.changereason_id.setErrors({ invalid: true ,required:true});
      result = false;      
    }
      
    if (this.documenttype_id.value == null  || this.documenttype_id.value<=0)
    {
      console.log('error2');
      this.documenttype_id.setErrors({'Phone Number does not exist.': true});
      result = false;
    }

    
    if ( this.document_number.value == null &&
         this.document_number.value<=0)
    {
      console.log('error2');
      this.document_number.setErrors({'Phone Number does not exist.': true});
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
  this.Selected_IncMarsoom.documentdate = moment(event.value).toDate();
}

addEventBeginDate(type: string, event: MatDatepickerInputEvent<Date>) {
  this.Selected_IncMarsoom.begindate = moment(event.value).toDate();
}

addEventChangeDate(type: string, event: MatDatepickerInputEvent<Date>) {

  this.Selected_IncMarsoom.changedate = moment(event.value).toDate();
}


}
