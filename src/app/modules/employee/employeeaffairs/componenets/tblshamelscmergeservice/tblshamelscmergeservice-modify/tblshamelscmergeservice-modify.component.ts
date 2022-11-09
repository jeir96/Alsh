import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Observable, startWith, map, of } from 'rxjs';
import { ITBLShamelDocumentType } from 'src/app/modules/shared/models/employees_department/ITBLShamelDocumentType';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { TBLShamelMergeServiceReason } from 'src/app/modules/shared/models/employees_department/TBLShamelMergeServiceReason';
import { TBLShamelSCMergeService } from 'src/app/modules/shared/models/employees_department/TBLShamelSCMergeService';
import { TBLShamelMergeServiceReasonService } from 'src/app/modules/shared/services/employees_department/tblshamel-merge-service-reason.service';
import { TBLShamelSCMergeServiceService } from 'src/app/modules/shared/services/employees_department/tblshamel-sc-merge-service.service';
import { TblshameldocumenttypeService } from 'src/app/modules/shared/services/employees_department/tblshameldocumenttype.service';
import { EmployeePageService } from '../../pageservice/employee-page-service';
@Component({
  selector: 'app-tblshamelscmergeservice-modify',
  templateUrl: './tblshamelscmergeservice-modify.component.html',
  styleUrls: ['./tblshamelscmergeservice-modify.component.scss']
})

export class TblshamelscmergeserviceModifyComponent implements OnInit {

  id: number|undefined;
  Selected_Emp: TBLShamelEmployee = {};
  _Selected_Employee_SCMergeService: TBLShamelSCMergeService
  @Input() set Selected_Employee_SCMergeService(obj: TBLShamelSCMergeService) {
    this._Selected_Employee_SCMergeService = obj;
    console.log('بلش');

    if (this._Selected_Employee_SCMergeService != null &&
      this._Selected_Employee_SCMergeService != undefined) {
      console.log('سث');
      console.log(this._Selected_Employee_SCMergeService);
      this.SetValue();
    }
  }

  get Selected_Employee_SCMergeService(): TBLShamelSCMergeService {
    return this._Selected_Employee_SCMergeService;
  }


  //Array Of AutoComplere With Filter
  
  List_TBLShamelMergeServiceReason :TBLShamelMergeServiceReason[]=[];
  filter_TBLShamelMergeServiceReason: Observable<TBLShamelMergeServiceReason[]>;  

  DocumentType_List :ITBLShamelDocumentType[]=[];
  filteredDocumentTypeOptions: Observable<ITBLShamelDocumentType[]>;


  
  // Access To Element in Form
  Form: UntypedFormGroup ;
  fcl_years   = new UntypedFormControl();
  fcl_months = new UntypedFormControl();
  fcl_days  = new UntypedFormControl();
  fcl_mergeservicereason_id  = new UntypedFormControl();  
  fcl_documenttype_id = new UntypedFormControl();
  fcl_document_number = new UntypedFormControl();
  fcl_documentdate = new UntypedFormControl();

  //Local Var

  submitted = false;
  loading: boolean = false;

  //#region Constuctor 
  constructor(    
    @Inject(MAT_DIALOG_DATA) public data: {obj: TBLShamelSCMergeService,id:number},
    public ShamelSCMergeService:TBLShamelSCMergeServiceService,
    public ShamelMergeServiceReasonService:TBLShamelMergeServiceReasonService,    
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
  
      if (this.ShamelMergeServiceReasonService.List_TBLShamelMergeServiceReason == null ||
        this.ShamelMergeServiceReasonService.List_TBLShamelMergeServiceReason== undefined ||
        this.ShamelMergeServiceReasonService.List_TBLShamelMergeServiceReason.length == 0)
        this.ShamelMergeServiceReasonService.fill();
      this.ShamelMergeServiceReasonService.List_TBLShamelMergeServiceReason_BehaviorSubject.subscribe(
        data => {
          this.List_TBLShamelMergeServiceReason = data;
          this.filter_TBLShamelMergeServiceReason = of(this.List_TBLShamelMergeServiceReason);
        }
      );

      if (this.ShameldocumenttypeService.List_ITBLShamelDocumentType == null ||
        this.ShameldocumenttypeService.List_ITBLShamelDocumentType== undefined ||
        this.ShameldocumenttypeService.List_ITBLShamelDocumentType.length == 0)
        this.ShameldocumenttypeService.fill();
      this.ShameldocumenttypeService.List_ITBLShamelDocumentType_BehaviorSubject.subscribe(
        data => {
          this.DocumentType_List = data;
          this.filteredDocumentTypeOptions = of(this.DocumentType_List);
        }
      );

      this.BuildForm();
      this.FillArrayUsingService();
  
      console.log('dsdf sadf asdfasdf asdf asd');
      console.log(data.obj);

      if (data!= null  && data.obj!= null && data.id!= null && data.id> 0) {

        console.log('dsdf sadf asdfasdf asdf asd');

        this.id = data.id;     
        this.Selected_Employee_SCMergeService = data.obj;
      }
  

  }    


  public async FillArrayUsingService()
  {
    try{

     
      
      this.filteredDocumentTypeOptions = this.fcl_documenttype_id.valueChanges
      .pipe(
        startWith(''),        
        map(value => value   && typeof value === 'string'  ? this._Filtered_DocumentType(value) : this.DocumentType_List.slice() )
      );  
    

      this.filter_TBLShamelMergeServiceReason = this.fcl_mergeservicereason_id.valueChanges
      .pipe(
        startWith(''),        
        map(value => value   && typeof value === 'string'  ? this._Filtered_TBLShamelMergeServiceReason(value) : this.List_TBLShamelMergeServiceReason.slice() )
      );  
    
  
      
    }catch(Exception : any)
    {}


   
     
  

   

  }

   
   //#endregion

   //#region  Init Component

   ngOnInit(): void {
     this.SetValue();
  }


  ngAfterViewInit() {

  }

  
  
   public BuildForm()
   {
    

      this.Form = new UntypedFormGroup({});
      this.fcl_days   = new UntypedFormControl();
      this.fcl_months  = new UntypedFormControl();
      this.fcl_years = new UntypedFormControl();
      this.fcl_document_number = new UntypedFormControl();
      this.fcl_mergeservicereason_id  = new UntypedFormControl();
      this.fcl_document_number  = new UntypedFormControl();
      this.fcl_documentdate   = new UntypedFormControl();      
      this.Form.addControl('days',this.fcl_days);
      this.Form.addControl('months',this.fcl_months);
      this.Form.addControl('years',this.fcl_years);
      this.Form.addControl('mergeservicereason_id',this.fcl_mergeservicereason_id);
      this.Form.addControl('documenttype_id',this.fcl_documenttype_id);
      this.Form.addControl('document_number',this.fcl_document_number);
      this.Form.addControl('documentdate',this.fcl_documentdate);

   
     
   
  }
   //#endregion


   //#region Filter Of  

    public  _Filtered_TBLShamelMergeServiceReason(value: string): TBLShamelMergeServiceReason[] 
     {    
    if (value!= null )
    {
    const filterValue = value ;
    return this.List_TBLShamelMergeServiceReason.filter(obj => obj.mergeservicereason_name && obj.mergeservicereason_name.includes(filterValue) );
    }
    return this.List_TBLShamelMergeServiceReason.slice();
  }

  public  _Filtered_DocumentType(value: string): ITBLShamelDocumentType[] {    
    if (value!= null)
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
      this.fcl_days.reset();
      this.fcl_months.reset();
      this.fcl_years.reset();
      this.fcl_mergeservicereason_id.reset();
      this.fcl_document_number.reset();
      this.fcl_document_number.reset();
      this.fcl_documenttype_id.reset();    

  }catch(ex: any)
  {

  }
  
  }


  //#region SetValue And GetValue Function
  public SetValue()
  {
    if (this.Selected_Employee_SCMergeService != null  &&
       this.Selected_Employee_SCMergeService.serial != null  &&
      this.Selected_Employee_SCMergeService.serial>0)
    {

    
      this.fcl_days.setValue(this.Selected_Employee_SCMergeService.days); 
      this.fcl_months.setValue(this.Selected_Employee_SCMergeService.months); 
      this.fcl_years.setValue(this.Selected_Employee_SCMergeService.years); 

      this.fcl_mergeservicereason_id.setValue(this.Selected_Employee_SCMergeService.mergeservicereason_id); 

      this.fcl_documenttype_id.setValue(this.Selected_Employee_SCMergeService.documenttype_id); 
      this.fcl_document_number.setValue(this.Selected_Employee_SCMergeService.document_number); 

      if (this.Selected_Employee_SCMergeService.documentdate != null)
        this.fcl_documentdate.setValue(moment(this.Selected_Employee_SCMergeService.documentdate).toDate());

      
    
    }
  
  }

  public getValue()
  {
    try{

if (this.Selected_Employee_SCMergeService != null  )
{

  this.Selected_Employee_SCMergeService.id = this.id;
  this.Selected_Employee_SCMergeService.days = this.fcl_days.value;
  this.Selected_Employee_SCMergeService.months = this.fcl_months.value;
    this.Selected_Employee_SCMergeService.years =this.fcl_years.value; 
    this.Selected_Employee_SCMergeService.mergeservicereason_id = this.fcl_mergeservicereason_id.value; 
    this.Selected_Employee_SCMergeService.documenttype_id = this.fcl_documenttype_id.value;        
    this.Selected_Employee_SCMergeService.document_number = this.fcl_document_number.value;

    this.Selected_Employee_SCMergeService.documentdate = moment(this.fcl_documentdate.value).toDate();
    
    
  }
  }catch(ex: any)
  {

  }
  
  }
//#endregion

 

  //#region OnSelect Function

  public OnSelect_TBLShamelMergeServiceReason(event: MatAutocompleteSelectedEvent) {
    if (event  != null && this.Selected_Employee_SCMergeService != null)
      this.Selected_Employee_SCMergeService.mergeservicereason_id = event.option.value;  
  }


  public OnSelect_DocumentType(event: MatAutocompleteSelectedEvent) {
    console.log('OnSelectStateChange');
    console.log(event.option.value);
    if ( event != null &&  this.Selected_Employee_SCMergeService != null)
      this.Selected_Employee_SCMergeService.documenttype_id = event.option.value;  
  }

  

  //#endregion


  //#region  Display Display Member
  public displayDocumentTypeProperty(value:string):string  {
    if (value != null && this.DocumentType_List!= null){     
      let documentType:any = this.DocumentType_List.find(crs => crs.documenttype_id.toString() == value) ;
      if (documentType != null )
      return documentType.documenttype_name;
    }
    return '';
  }


  public display_TBLShamelMergeServiceReason(value:string):string  {

    console.log('dsdsdfsdf');
    console.log(value);
    if (value!= null && this.List_TBLShamelMergeServiceReason != null){

      let obj:TBLShamelMergeServiceReason | undefined = this.List_TBLShamelMergeServiceReason.find(spec => spec.mergeservicereason_id && spec.mergeservicereason_id.toString() == value) ;
      if (obj!= null  &&  obj.mergeservicereason_name!= null )
        return obj.mergeservicereason_name;
    }
    return '';
  }





 

  

  public async Save()
  {
 
    this.submitted = true;

   
    console.log("this.Form.invalid"+this.Form.errors);

    
    if (!this.Form.valid == true ) {
      console.log("this.Form.طلع");
      return;
    }

    console.log(this.Selected_Employee_SCMergeService);
    console.log(this.Selected_Employee_SCMergeService.serial);

    this.getValue();

    if (this.Selected_Employee_SCMergeService!= null   &&
      (this.Selected_Employee_SCMergeService.serial== null  ||
      this.Selected_Employee_SCMergeService.serial<=0))
      {

        console.log("dgs adfgdsfg sdfg sd");

        this.ShamelSCMergeService.add(this.Selected_Employee_SCMergeService).toPromise().then(res => {
          console.log(res)
          if (res == 1)
        {
          this.ClearForm();

        }else
        {



        }
    });
  }
   else if (this.Selected_Employee_SCMergeService != null  &&
    this.Selected_Employee_SCMergeService.serial != null &&
             this.Selected_Employee_SCMergeService.serial>0)
             {

      this.ShamelSCMergeService.update(this.Selected_Employee_SCMergeService).toPromise().then(res => {
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
