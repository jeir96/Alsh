
import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {  UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ITBLShamelCertificate } from 'src/app/modules/shared/models/employees_department/ITBLShamelCertificate';
import { ITBLShamelCountry } from 'src/app/modules/shared/models/employees_department/ITBLShamelCountry';
import { ITBLShamelRank } from 'src/app/modules/shared/models/employees_department/ITBLShamelRank';
import { ITBLShamelSCEducation } from 'src/app/modules/shared/models/employees_department/ITBLShamelSCEducation';
import { ITBLShamelState } from 'src/app/modules/shared/models/employees_department/ITBLShamelState';
import { TBLShamelCertificateService } from 'src/app/modules/shared/services/employees_department/tblshamel-certificate.service';
import { TblshamelcountryService } from 'src/app/modules/shared/services/employees_department/tblshamelcountry.service';
import { TblshamelsceducationService } from 'src/app/modules/shared/services/employees_department/tblshamelsceducation.service';
import { TblshamelstateService } from 'src/app/modules/shared/services/employees_department/tblshamelstate.service';

import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { ITBLShamelSpecification } from 'src/app/modules/shared/models/employees_department/ITBLShamelSpecification';
import { TblshamelrankService } from 'src/app/modules/shared/services/employees_department/tblshamelrank.service';
import { TblshamelspecificationService } from 'src/app/modules/shared/services/employees_department/tblshamelspecification.service';
import { EmployeePageService } from '../../employee-page-service';

@Component({
  selector: 'app-tblshamelsceducationmodify',
  templateUrl: './tblshamelsceducationmodify.component.html',
  styleUrls: ['./tblshamelsceducationmodify.component.scss']
})
export class TblshamelsceducationmodifyComponent implements OnInit,AfterViewInit {

id: number;
Selected_Emp: TBLShamelEmployee = {};
_Selected_Employee_Education: ITBLShamelSCEducation;
@Input() set Selected_Employee_Education(obj: ITBLShamelSCEducation) {
  this._Selected_Employee_Education = obj;
  console.log('بلش');

  if (this._Selected_Employee_Education != null &&
    this._Selected_Employee_Education != undefined) {
    console.log('سث');
    console.log(this._Selected_Employee_Education);
    this.SetValue();
  }
}

get Selected_Employee_Education(): ITBLShamelSCEducation {
  return this._Selected_Employee_Education;
}

  //Array Of AutoComplere With Filter
  Rank_List: ITBLShamelRank[]=[];
  filteredRankOptions: Observable<ITBLShamelRank[]>;

  State_List :ITBLShamelState[]=[];
  filteredStateOptions: Observable<ITBLShamelState[]>;

  Country_List :ITBLShamelCountry[]=[];
  filteredCountryOptions: Observable<ITBLShamelCountry[]>;

  Certificate_List :ITBLShamelCertificate[]=[];
  filteredCertificateOptions: Observable<ITBLShamelCertificate[]>;

  Specification_List :ITBLShamelSpecification[]=[];
  filteredSpecificationOptions: Observable<ITBLShamelSpecification[]>;  

 
  
  // Access To Element in Form
  Form: UntypedFormGroup ;
  input_certificate_id   = new UntypedFormControl({value: ''},[Validators.required, Validators.minLength(5)]);
  input_specification_id = new UntypedFormControl('',[ Validators.required ]);
  input_graduationyear = new UntypedFormControl('',[ Validators.required ]);
  input_country_id = new UntypedFormControl({value: 'سوريا' },);
  input_city_id = new UntypedFormControl('',);
  input_rank_id = new UntypedFormControl('',);
  input_studyduration = new UntypedFormControl('');
  

  submitted = false;


  //#region Constuctor 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {obj: ITBLShamelSCEducation,id:number},
    public educationService:TblshamelsceducationService,
    public countryService:TblshamelcountryService,
    public stateService:TblshamelstateService,
    public rankService:TblshamelrankService,
    public CertificateService:TBLShamelCertificateService,  
    public specificationService:TblshamelspecificationService ,
    private fb: UntypedFormBuilder,
    public PageService: EmployeePageService,
  ) {

    this.PageService.Subject_Selected_TBLShamelEmployee.subscribe(
      data => {
        this.Selected_Emp = data;
        this.id = this.Selected_Emp.id;
      }
    )

    if (this.CertificateService.List_ITBLShamelCertificate == null ||
      this.CertificateService.List_ITBLShamelCertificate== undefined ||
      this.CertificateService.List_ITBLShamelCertificate.length == 0)
      this.CertificateService.fill();
    this.CertificateService.List_ITBLShamelCertificate_BehaviorSubject.subscribe(
      data => {
        this.Certificate_List = data;
        this.filteredCertificateOptions = of(this.Certificate_List);
      }
    )

    if (this.specificationService.list_TBLShamelSpecification == null ||
      this.specificationService.list_TBLShamelSpecification== undefined ||
      this.specificationService.list_TBLShamelSpecification.length == 0)
      this.specificationService.fill();
    this.specificationService.List_TBLShamelSpecification_BehaviorSubject.subscribe(
      data => {
        this.Specification_List = data;
        this.filteredSpecificationOptions = of(this.Specification_List);
      }
    )


    if (this.countryService.List_ITBLShamelCountry == null ||
      this.countryService.List_ITBLShamelCountry == undefined ||
      this.countryService.List_ITBLShamelCountry.length == 0)
      this.countryService.fill();
    this.countryService.List_ITBLShamelCountry_BehaviorSubject.subscribe(
      data => {
        this.Country_List = data;
        this.filteredCountryOptions = of(this.Country_List);
      }
    )

    if (this.stateService.list_TBLShamelState == null ||
      this.stateService.list_TBLShamelState == undefined ||
      this.stateService.list_TBLShamelState.length == 0)
      this.stateService.fill();
    this.stateService.List_TBLShamelState_BehaviorSubject.subscribe(
      data => {
        this.State_List = data;
        this.filteredStateOptions= of(this.State_List);
      }
    )

    if (this.rankService.list_ITBLShamelRank == null ||
      this.rankService.list_ITBLShamelRank == undefined ||
      this.rankService.list_ITBLShamelRank.length == 0)
      this.rankService.fill();
    this.rankService.List_ITBLShamelRank_BehaviorSubject.subscribe(
      data => {
        this.Rank_List = data;
        this.filteredRankOptions = of(this.Rank_List);
      }
    )

    this.BuildForm();
    this.FillArrayUsingService();

    if (data!= null  && data.obj!= null && data.id!= null && data.id> 0) {
      this.id = data.id;
      this.Selected_Employee_Education = data.obj;
    }



   
    


  }
        
      

    
  ngOnInit(): void {



  }


  ngAfterViewInit() {

  }


    public async FillArrayUsingService()
   {
     try{
      
      this.filteredStateOptions = this.input_city_id.valueChanges
      .pipe(
        startWith(''),        
        map(value => value   && typeof value === 'string'  ? this._filteredState(value) : this.State_List.slice() )
      );
  

    
     }catch(Exception : any)
     {}

     try{
     
    this.filteredSpecificationOptions = this.input_specification_id.valueChanges
    .pipe(
      startWith(''),    
      map(value => value   && typeof value === 'string'  ? this._filteredSpecification(value) : this.Specification_List.slice() )
    );

    }catch(Exception : any)
    {}

    try{
    
    this.filteredCertificateOptions = this.input_certificate_id.valueChanges
    .pipe(
      startWith(''),     
      map(value => value   && typeof value === 'string'  ? this._filteredCertificate(value) : this.Certificate_List.slice())
    );

    }catch(Exception : any){}

    try{
   
    this.filteredCountryOptions = this.input_country_id.valueChanges
    .pipe(
      startWith(''),     
      map(value => value   && typeof value === 'string'  ? this._filteredCounty(value) : this.Country_List.slice())
    );
    }catch(Exception : any){}

    try{
    
    this.filteredRankOptions = this.input_rank_id.valueChanges
    .pipe(
      startWith(''),      
      map(value => value   && typeof value === 'string' ? this._filteredRank(value) : this.Rank_List.slice())
    );
    }catch(Exception : any){}

   }
  
   public BuildForm()
   {
     try{    
      this.Form = this.fb.group({
        });
        this.Form .addControl('input_certificate_id',this.input_certificate_id);
        this.input_certificate_id.updateValueAndValidity();
        this.Form .addControl('input_city_id',this.input_city_id);
        this.Form .addControl('input_country_id',this.input_country_id);
        this.Form .addControl('input_graduationyear',this.input_graduationyear);
        this.Form .addControl('input_rank_id',this.input_rank_id);
        this.Form .addControl('input_specification_id',this.input_specification_id);
        this.Form .addControl('input_studyduration',this.input_studyduration);    
      }catch(Exception:any){}
   }

   private _filteredSpecification(value: string): ITBLShamelSpecification[] {    
    if (value)
    {
    const filterValue = value ;
    return this.Specification_List.filter(obj => obj.specification_name.includes(filterValue) );
    }
    return this.Specification_List.slice();
  }
  private _filteredCertificate(value: string): ITBLShamelCertificate[] {    
    if (value)
    {
    const filterValue = value ;
    return this.Certificate_List.filter(obj => obj.certificate_name.includes(filterValue) );
    }
    return this.Certificate_List.slice();
  }
  private _filteredCounty(value: string): ITBLShamelCountry[] {    
    if (value)
    {
      const filterValue = value ;
      return this.Country_List.filter(obj => obj.country_name.includes(filterValue) );

    }
    return this.Country_List.slice();

  }
  private _filteredRank(value: string): ITBLShamelRank[] {    
    if (value)
    {
    const filterValue = value ;
    return this.Rank_List.filter(obj => obj.rank_name.includes(filterValue) );
    }
    return this.Rank_List.slice();
  }
  private _filteredState(value: string): ITBLShamelState[] {    
    if (value)
    {
    const filterValue = value ;
    return this.State_List.filter(obj => obj.state_name.includes(filterValue) );
    }
    return this.State_List.slice();
  }
  //#endregion


  //#region SetValue And GetValue Function
  public ClearForm()
  {
    try{


    this.input_city_id.reset();
    this.input_country_id.reset();
    this.input_graduationyear.reset();
    this.input_studyduration.reset();
    this.input_rank_id.reset();
    this.input_specification_id.reset();
    this.input_studyduration.reset();
    this.input_certificate_id.reset();


  }catch(ex: any)
  {

  }
  
  }


  //#region SetValue And GetValue Function
  public SetValue()
  {
    try{
if (this.Selected_Employee_Education != null &&
  this.Selected_Employee_Education != undefined )
{


    this.input_city_id.setValue(this.Selected_Employee_Education.city_id);
    this.input_country_id.setValue(this.Selected_Employee_Education.country_id);
    this.input_graduationyear.setValue(this.Selected_Employee_Education.graduationyear);
    this.input_rank_id.setValue(this.Selected_Employee_Education.rank_id);
    this.input_specification_id.setValue(this.Selected_Employee_Education.specification_id);
    this.input_studyduration.setValue(this.Selected_Employee_Education.studyduration);
  }
  }catch(ex: any)
  {

  }
  
  }

  public getValue()
  {
    try{

      if (this.Selected_Employee_Education != null &&
        this.Selected_Employee_Education != undefined )
      {
  console.log( this.input_city_id.value);
    this.Selected_Employee_Education.city_id = this.input_city_id.value;
    this.Selected_Employee_Education.country_id = this.input_country_id.value;
    this.Selected_Employee_Education.graduationyear = this.input_graduationyear.value;    
    this.Selected_Employee_Education.rank_id = this.input_rank_id.value;
    this.Selected_Employee_Education.specification_id = this.input_specification_id.value;
    this.Selected_Employee_Education.studyduration =this.input_studyduration.value;
  }
  }catch(ex: any)
  {

  }
  
  }

  public OnSelectCountryChange(event: MatAutocompleteSelectedEvent) {
    if (event  && this.Selected_Employee_Education )
      this.Selected_Employee_Education.country_id = event.option.value;
   

  }

  public OnSelectStateChange(event: MatAutocompleteSelectedEvent) {
    if ( event  &&  this.Selected_Employee_Education )
      this.Selected_Employee_Education.city_id = event.option.value;
    

  }

  public OnSelectRankChange(event: MatAutocompleteSelectedEvent) {
    if ( event  &&  this.Selected_Employee_Education )
      this.Selected_Employee_Education.rank_id = event.option.value;
  }


  public OnSelectCertificateChange(event: MatAutocompleteSelectedEvent) {
    if (event  && this.Selected_Employee_Education )
      this.Selected_Employee_Education.certificate_id = event.option.value;
   
  }

  public OnSelectSpecificationChange(event: MatAutocompleteSelectedEvent) {
  
    if ( event  &&  this.Selected_Employee_Education )
      this.Selected_Employee_Education.specification_id = event.option.value;
   
  }


  public displayCertificateProperty(value:string):string  {
    if (value && this.Certificate_List){     
      let cer:any = this.Certificate_List.find(cer => cer.certificate_id.toString() == value) ;
      if (cer )
      return cer.certificate_name;
    }
    return '';
  }


  public displaySpecificationProperty(value:string):string  {
    if (value && this.Specification_List ){

      let Specification:any = this.Specification_List.find(spec => spec.specification_id.toString() == value) ;
      if (Specification )
      return Specification.specification_name;
    }
    return '';
  }

  public displayStateProperty(value:string):string  {
    if (value && this.State_List){
     
      let state:any = this.State_List.find(obj => obj.state_id.toString() == value) ;
      if (state )
      return state.state_name;
    }
    return '';
  }

  
  public displayRankProperty(value:string):string  {
    if (value && this.Rank_List ){
     
      let rank:any = this.Rank_List.find(obj => obj.rank_id.toString() == value) ;
      if (rank )
      return rank.rank_name;
    }
    return '';

   
  }

  public displayCountryProperty(value:string):string  {
    if (value && this.Country_List ){
      let country:any = this.Country_List.find(obj => obj.country_id.toString() == value) ;
      if (country )
      return country.country_name;
    }
    return '';
  }
  //#endregion

  public ClearObject()
  {
    if (!this.Selected_Employee_Education)
    this.Selected_Employee_Education = {};

    this.Selected_Employee_Education.id= this.Selected_Emp.id ; 
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

    if (this.Selected_Employee_Education != null  &&
      this.Selected_Employee_Education != undefined  &&
      (this.Selected_Employee_Education.serial == null || this.Selected_Employee_Education.serial<=0)
      )

        this.educationService.add(this.Selected_Employee_Education).toPromise().then(res => {
          console.log(res)
          if (res == 1)
        {
          this.ClearObject();
          this.ClearForm();
        }
    });
   
   else     if (this.Selected_Employee_Education != null  &&
    this.Selected_Employee_Education != undefined  &&
    this.Selected_Employee_Education.serial != null &&
     this.Selected_Employee_Education.serial > 0)
    

      this.educationService.update(this.Selected_Employee_Education).toPromise().then(res => {
        console.log(res)
        if (res == 1)
        {
          

        }
    });


  }


  public ValidateForm():boolean
  {
    let result : boolean = true;
    console.log('this.input_certificate_id'+this.input_certificate_id.value);


    if (this.input_certificate_id.value == null ||this.input_certificate_id.value ==undefined || this.input_certificate_id.value <=0)
    {
      console.log('error1');
      this.input_certificate_id.setErrors({ invalid: true ,required:true});
      result = false;
      
    }
      
    if (this.input_specification_id.value == null ||this.input_specification_id.value == undefined  || this.input_specification_id.value<=0)
    {
      console.log('error2');
      this.input_certificate_id.setErrors({'Phone Number does not exist.': true});
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
}
