
import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, forkJoin, Observable, of, Subscription } from 'rxjs';

import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
import { Validator_Education } from './Validator_Education';

@Component({
  selector: 'app-tblshamelsceducationmodify',
  templateUrl: './tblshamelsceducationmodify.component.html',
  styleUrls: ['./tblshamelsceducationmodify.component.scss']
})
export class TblshamelsceducationmodifyComponent implements OnInit, AfterViewInit, OnDestroy {

  id_employee: number;
  Selected_Emp: TBLShamelEmployee = {};
  _Selected_Employee_Education: ITBLShamelSCEducation;
  @Input() set Selected_Employee_Education(obj: ITBLShamelSCEducation) {
    this._Selected_Employee_Education = obj;


    if (this._Selected_Employee_Education != null &&
      this._Selected_Employee_Education != undefined) {

      this.SetValue();
    }
  }

  get Selected_Employee_Education(): ITBLShamelSCEducation {
    return this._Selected_Employee_Education;
  }

  //Array Of AutoComplere With Filter
  Rank_List: ITBLShamelRank[] = [];
  filteredRankOptions: Observable<ITBLShamelRank[]>;

  State_List: ITBLShamelState[] = [];
  filteredStateOptions: Observable<ITBLShamelState[]>;

  Country_List: ITBLShamelCountry[] = [];
  filteredCountryOptions: Observable<ITBLShamelCountry[]>;

  Certificate_List: ITBLShamelCertificate[] = [];
  filteredCertificateOptions: Observable<ITBLShamelCertificate[]>;

  Specification_List: ITBLShamelSpecification[] = [];
  filteredSpecificationOptions: Observable<ITBLShamelSpecification[]>;


  _Subscription: Subscription;
  // Access To Element in Form
  Form: FormGroup;
  serial: FormControl<number | null>;
  id: FormControl<number | null>;
  certificate_id: FormControl<number | null>;
  specification_id: FormControl<number | null>;
  graduationyear: FormControl<number | null>;
  country_id: FormControl<number | null>;
  city_id: FormControl<number | null>;
  rank_id: FormControl<number | null>;
  studyduration: FormControl<string | null>;


  submitted = false;


  //#region Constuctor 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { obj: ITBLShamelSCEducation, id: number },
    public educationService: TblshamelsceducationService,
    public countryService: TblshamelcountryService,
    public stateService: TblshamelstateService,
    public rankService: TblshamelrankService,
    public CertificateService: TBLShamelCertificateService,
    public specificationService: TblshamelspecificationService,
    private fb: UntypedFormBuilder,
    public PageService: EmployeePageService,
  ) {
    if (data != null && data.obj != null && data.id != null && data.id > 0) {
      this.id_employee = data.id;
      this.Selected_Employee_Education = data.obj;
    }

    this.PageService.Subject_Selected_TBLShamelEmployee.subscribe(
      data => {
        this.Selected_Emp = data;
        this.id_employee = this.Selected_Emp.id;
      }
    )

    this.BuildForm();
    this.Load_Data();
  }

  ngOnDestroy(): void {
    this._Subscription.unsubscribe();
  }

  Load_ITBLShamelCertificate(): Observable<ITBLShamelCertificate[]> {
    if (this.CertificateService.List_ITBLShamelCertificate == null ||
      this.CertificateService.List_ITBLShamelCertificate == undefined ||
      this.CertificateService.List_ITBLShamelCertificate.length == 0)
      return this.CertificateService.list();
    return of(this.CertificateService.List_ITBLShamelCertificate);
  }




  Load_TBLShamelSpecification(): Observable<ITBLShamelSpecification[]> {
    if (this.specificationService.list_TBLShamelSpecification == null ||
      this.specificationService.list_TBLShamelSpecification == undefined ||
      this.specificationService.list_TBLShamelSpecification.length == 0)
      return this.specificationService.list();
    return of(this.specificationService.list_TBLShamelSpecification);
  }

  Load_ITBLShamelCountry(): Observable<ITBLShamelCountry[]> {
    if (this.countryService.List_ITBLShamelCountry == null ||
      this.countryService.List_ITBLShamelCountry == undefined ||
      this.countryService.List_ITBLShamelCountry.length == 0)
      return this.countryService.list();
    return of(this.countryService.List_ITBLShamelCountry);
  }


  Load_ITBLShamelState(): Observable<ITBLShamelState[]> {
    if (this.stateService.list_TBLShamelState == null ||
      this.stateService.list_TBLShamelState == undefined ||
      this.stateService.list_TBLShamelState.length == 0)
      return this.stateService.list();
    return of(this.stateService.list_TBLShamelState);
  }

  Load_ITBLShamelRank(): Observable<ITBLShamelRank[]> {
    if (this.rankService.list_ITBLShamelRank == null ||
      this.rankService.list_ITBLShamelRank == undefined ||
      this.rankService.list_ITBLShamelRank.length == 0)
      return this.rankService.list();
    return of(this.rankService.list_ITBLShamelRank);
  }

  Load_Data() {
    combineLatest([this.PageService.Subject_Selected_TBLShamelEmployee]).subscribe
      (
        res => {
          this.Selected_Emp = res[0];
          if (this.Selected_Emp != null && this.Selected_Emp.id != null)
            this.id_employee = this.Selected_Emp.id;
          this._Subscription = forkJoin(
            this.Load_ITBLShamelCertificate(),
            this.Load_TBLShamelSpecification(),
            this.Load_ITBLShamelCountry(),
            this.Load_ITBLShamelState(),
            this.Load_ITBLShamelRank()
          ).subscribe(
            res => {
              this.Certificate_List = res[0];
              this.CertificateService.List_ITBLShamelCertificate = res[0];
              this.CertificateService.List_ITBLShamelCertificate_BehaviorSubject.next(res[0]);
              this.filteredCertificateOptions = of(this.Certificate_List);

              this.Specification_List = res[1];
              this.specificationService.list_TBLShamelSpecification = res[1];
              this.specificationService.List_TBLShamelSpecification_BehaviorSubject.next(res[1]);
              this.filteredSpecificationOptions = of(this.Specification_List);

              this.Country_List = res[2];
              this.countryService.List_ITBLShamelCountry = res[2];
              this.countryService.List_ITBLShamelCountry_BehaviorSubject.next(res[2]);
              this.filteredCountryOptions = of(this.Country_List);

              this.State_List = res[3];
              this.stateService.list_TBLShamelState = res[3];
              this.stateService.List_TBLShamelState_BehaviorSubject.next(res[3]);
              this.filteredStateOptions = of(this.State_List);

              this.Rank_List = res[4];
              this.rankService.list_ITBLShamelRank = res[4];
              this.rankService.List_ITBLShamelRank_BehaviorSubject.next(res[4]);
              this.filteredRankOptions = of(this.Rank_List);


              this.FillArrayUsingService();

              this.SetValue();
            }
          )
        }
      )
  }

  //#endregion
  public BuildForm() {
    try {


      // Access To Element in Form
      this.Form = this.fb.group(
        {
          'serial': this.serial = new FormControl<number | null>(null, []),
          'id': this.id = new FormControl<number | null>(null, []),
          'certificate_id': this.certificate_id = new FormControl<number | null>(null, []),
          'specification_id': this.specification_id = new FormControl<number | null>(null, []),
          'graduationyear': this.graduationyear = new FormControl<number | null>(null, []),
          'country_id': this.country_id = new FormControl<number | null>(null, []),
          'city_id': this.city_id = new FormControl<number | null>(null, []),
          'rank_id': this.rank_id = new FormControl<number | null>(null, []),
          'studyduration': this.studyduration = new FormControl<string | null>(null, []),
        },
        {
          updateOn: 'change',
          asyncValidators: Validator_Education(this.educationService).bind(this) // <= async validator       
        }
      );

    } catch (Exception: any) {
      console.log(Exception);
    }
  }








  ngOnInit(): void {



  }


  ngAfterViewInit() {

  }


  public async FillArrayUsingService() {
    try {

      this.filteredStateOptions = this.city_id.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredState(value) : this.State_List.slice())
        );



    } catch (Exception: any) { }

    try {

      this.filteredSpecificationOptions = this.specification_id.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredSpecification(value) : this.Specification_List.slice())
        );

    } catch (Exception: any) { }

    try {

      this.filteredCertificateOptions = this.certificate_id.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredCertificate(value) : this.Certificate_List.slice())
        );

    } catch (Exception: any) { }

    try {

      this.filteredCountryOptions = this.country_id.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredCounty(value) : this.Country_List.slice())
        );
    } catch (Exception: any) { }

    try {

      this.filteredRankOptions = this.rank_id.valueChanges
        .pipe(
          startWith(''),
          map(value => value && typeof value === 'string' ? this._filteredRank(value) : this.Rank_List.slice())
        );
    } catch (Exception: any) { }

  }



  private _filteredSpecification(value: string): ITBLShamelSpecification[] {
    if (value) {
      const filterValue = value;
      return this.Specification_List.filter(obj => obj.specification_name.includes(filterValue));
    }
    return this.Specification_List.slice();
  }
  private _filteredCertificate(value: string): ITBLShamelCertificate[] {
    if (value) {
      const filterValue = value;
      return this.Certificate_List.filter(obj => obj.certificate_name.includes(filterValue));
    }
    return this.Certificate_List.slice();
  }
  private _filteredCounty(value: string): ITBLShamelCountry[] {
    if (value) {
      const filterValue = value;
      return this.Country_List.filter(obj => obj.country_name.includes(filterValue));

    }
    return this.Country_List.slice();

  }
  private _filteredRank(value: string): ITBLShamelRank[] {
    if (value) {
      const filterValue = value;
      return this.Rank_List.filter(obj => obj.rank_name.includes(filterValue));
    }
    return this.Rank_List.slice();
  }
  private _filteredState(value: string): ITBLShamelState[] {
    if (value) {
      const filterValue = value;
      return this.State_List.filter(obj => obj.state_name.includes(filterValue));
    }
    return this.State_List.slice();
  }
  //#endregion


  //#region SetValue And GetValue Function
  public ClearForm() {
    try {


      this.Form.reset();

    } catch (ex: any) {

    }

  }


  //#region SetValue And GetValue Function
  public SetValue() {
    try {
      if (this.Selected_Employee_Education != null &&
        this.Selected_Employee_Education != undefined) {

        if (this.Selected_Employee_Education.city_id != null && this.Selected_Employee_Education.city_id != undefined)
          this.city_id.setValue(this.Selected_Employee_Education.city_id);

        if (this.Selected_Employee_Education.city_id != null && this.Selected_Employee_Education.city_id != undefined)
          this.country_id.setValue(this.Selected_Employee_Education.country_id);
        if (this.Selected_Employee_Education.city_id != null && this.Selected_Employee_Education.city_id != undefined)
          this.graduationyear.setValue(this.Selected_Employee_Education.graduationyear);
        if (this.Selected_Employee_Education.city_id != null && this.Selected_Employee_Education.city_id != undefined)
          this.rank_id.setValue(this.Selected_Employee_Education.rank_id);
        if (this.Selected_Employee_Education.city_id != null && this.Selected_Employee_Education.city_id != undefined)
          this.specification_id.setValue(this.Selected_Employee_Education.specification_id);
        if (this.Selected_Employee_Education.city_id != null && this.Selected_Employee_Education.city_id != undefined)
          this.studyduration.setValue(this.Selected_Employee_Education.studyduration);
      }
    } catch (ex: any) {

    }

  }

  public getValue() {
    try {

      if (this.Selected_Employee_Education != null &&
        this.Selected_Employee_Education != undefined) {
        console.log(this.city_id.value);
        this.Selected_Employee_Education.city_id = this.city_id.value;
        this.Selected_Employee_Education.country_id = this.country_id.value;
        this.Selected_Employee_Education.graduationyear = this.graduationyear.value;
        this.Selected_Employee_Education.rank_id = this.rank_id.value;
        this.Selected_Employee_Education.specification_id = this.specification_id.value;
        this.Selected_Employee_Education.studyduration = this.studyduration.value;
      }
    } catch (ex: any) {

    }

  }

  public OnSelectCountryChange(event: MatAutocompleteSelectedEvent) {
    if (event && this.Selected_Employee_Education)
      this.Selected_Employee_Education.country_id = event.option.value;


  }

  public OnSelectStateChange(event: MatAutocompleteSelectedEvent) {
    if (event && this.Selected_Employee_Education)
      this.Selected_Employee_Education.city_id = event.option.value;


  }

  public OnSelectRankChange(event: MatAutocompleteSelectedEvent) {
    if (event && this.Selected_Employee_Education)
      this.Selected_Employee_Education.rank_id = event.option.value;
  }


  public OnSelectCertificateChange(event: MatAutocompleteSelectedEvent) {
    if (event && this.Selected_Employee_Education)
      this.Selected_Employee_Education.certificate_id = event.option.value;

  }

  public OnSelectSpecificationChange(event: MatAutocompleteSelectedEvent) {

    if (event && this.Selected_Employee_Education)
      this.Selected_Employee_Education.specification_id = event.option.value;

  }


  public displayCertificateProperty(value: string): string {
    if (value && this.Certificate_List) {
      let cer: any = this.Certificate_List.find(cer => cer.certificate_id.toString() == value);
      if (cer)
        return cer.certificate_name;
    }
    return '';
  }


  public displaySpecificationProperty(value: string): string {
    if (value && this.Specification_List) {

      let Specification: any = this.Specification_List.find(spec => spec.specification_id.toString() == value);
      if (Specification)
        return Specification.specification_name;
    }
    return '';
  }

  public displayStateProperty(value: string): string {
    if (value && this.State_List) {

      let state: any = this.State_List.find(obj => obj.state_id.toString() == value);
      if (state)
        return state.state_name;
    }
    return '';
  }


  public displayRankProperty(value: string): string {
    if (value && this.Rank_List) {

      let rank: any = this.Rank_List.find(obj => obj.rank_id.toString() == value);
      if (rank)
        return rank.rank_name;
    }
    return '';


  }

  public displayCountryProperty(value: string): string {
    if (value && this.Country_List) {
      let country: any = this.Country_List.find(obj => obj.country_id.toString() == value);
      if (country)
        return country.country_name;
    }
    return '';
  }
  //#endregion

  public ClearObject() {
    if (!this.Selected_Employee_Education)
      this.Selected_Employee_Education = {};

    this.Selected_Employee_Education.id = this.Selected_Emp.id;
  }

  public async Save() {



    if (!this.Form.valid) {
      return;
    }
    if (!this.ValidateForm() == true) {
      return;
    }
    this.getValue();

    if (this.Selected_Employee_Education != null &&
      this.Selected_Employee_Education != undefined &&
      (this.Selected_Employee_Education.serial == null || this.Selected_Employee_Education.serial <= 0)
    )

      this.educationService.add(this.Selected_Employee_Education).toPromise().then(res => {
        console.log(res)
        if (res == 1) {
          this.ClearObject();
          this.ClearForm();
        }
      });

    else if (this.Selected_Employee_Education != null &&
      this.Selected_Employee_Education != undefined &&
      this.Selected_Employee_Education.serial != null &&
      this.Selected_Employee_Education.serial > 0)


      this.educationService.update(this.Selected_Employee_Education).toPromise().then(res => {
        console.log(res)
        if (res == 1) {


        }
      });


  }


  public ValidateForm(): boolean {
    let result: boolean = true;
    console.log('this.certificate_id' + this.certificate_id.value);


    if (this.certificate_id.value == null || this.certificate_id.value == undefined || this.certificate_id.value <= 0) {
      console.log('error1');
      this.certificate_id.setErrors({ invalid: true, required: true });
      result = false;

    }

    if (this.specification_id.value == null || this.specification_id.value == undefined || this.specification_id.value <= 0) {
      console.log('error2');
      this.certificate_id.setErrors({ 'Phone Number does not exist.': true });
      result = false;

    }


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
