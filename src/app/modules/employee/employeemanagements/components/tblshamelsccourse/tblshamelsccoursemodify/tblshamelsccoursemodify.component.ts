
import { Component, OnInit, AfterViewInit, Input, Inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder, Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { Observable, of, startWith, map, combineLatest, forkJoin } from 'rxjs';
import { ITBLShamelCountry } from 'src/app/modules/shared/models/employees_department/ITBLShamelCountry';
import { ITBLShamelCourse } from 'src/app/modules/shared/models/employees_department/ITBLShamelCourse';
import { ITBLShamelSCCourse } from 'src/app/modules/shared/models/employees_department/ITBLShamelSCCourse';
import { ITBLShamelSpecification } from 'src/app/modules/shared/models/employees_department/ITBLShamelSpecification';
import { ITBLShamelState } from 'src/app/modules/shared/models/employees_department/ITBLShamelState';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { TBLShamelUser } from 'src/app/modules/shared/models/employees_department/TBLShamelUser';
import { TBLShamelUserService } from 'src/app/modules/shared/services/employees_department/tblshamel-user.service';
import { TblshamelcountryService } from 'src/app/modules/shared/services/employees_department/tblshamelcountry.service';
import { TblshamelcourseService } from 'src/app/modules/shared/services/employees_department/tblshamelcourse.service';
import { TblshamelsccourseService } from 'src/app/modules/shared/services/employees_department/tblshamelsccourse.service';
import { TblshamelspecificationService } from 'src/app/modules/shared/services/employees_department/tblshamelspecification.service';
import { TblshamelstateService } from 'src/app/modules/shared/services/employees_department/tblshamelstate.service';
import { EmployeePageService } from '../../employee-page-service';
import { ValidateForm } from './validate/validate_fromgroup';

const moment = _moment;


@Component({
  selector: 'app-tblshamelsccoursemodify',
  templateUrl: './tblshamelsccoursemodify.component.html',
  styleUrls: ['./tblshamelsccoursemodify.component.scss']
})
export class TblshamelsccoursemodifyComponent implements OnInit, AfterViewInit {

  //ملئ القيم بالكائن الذي نريد التعامل معه 
  @Input() employee_id: number;
  Selected_Emp: TBLShamelEmployee = {};

  _Selected_Employee_Course: ITBLShamelSCCourse = {};
  @Input() set Selected_Employee_Course(obj: ITBLShamelSCCourse) {
    this._Selected_Employee_Course = obj;
    if (this._Selected_Employee_Course != null &&
      this._Selected_Employee_Course != undefined) {
        
    }
  }

  get Selected_Employee_Course(): ITBLShamelSCCourse {
    return this._Selected_Employee_Course;
  }


  //مصفوفات من أجل autoComplete
  Course_List: ITBLShamelCourse[] = [];
  filteredCourseOptions: Observable<ITBLShamelCourse[]>;

  Specification_List: ITBLShamelSpecification[] = [];
  filteredSpecificationOptions: Observable<ITBLShamelSpecification[]>;

  State_List: ITBLShamelState[] = [];
  filteredStateOptions: Observable<ITBLShamelState[]>;

  Country_List: ITBLShamelCountry[] = [];
  filteredCountryOptions: Observable<ITBLShamelCountry[]>;


  //تعريف Form
  // Access To Element in Form
  Form: FormGroup;
  id: FormControl<number | null>;
  serial: FormControl<number | null>;

  course_id: FormControl<number | null>;
  specification_id: FormControl<number | null>;
  country_id: FormControl<number | null>;
  city_id: FormControl<number | null>;
  startdate: FormControl<Date | null>;
  enddate: FormControl<Date | null>;
  studyduration: FormControl<string | null>;



  //من اجل تسجيل من أنشأ وعدل السجل
  Login_User: TBLShamelUser;

  submitted = false;

  //يظهر عند تحميل البيانات
  loading: boolean = false;

  //#region Constuctor 
  constructor(
    private frmBuilder: FormBuilder,
    public PageService: EmployeePageService,
    public sccourseService: TblshamelsccourseService,
    public courseService: TblshamelcourseService,
    public specificationService: TblshamelspecificationService,
    public countryService: TblshamelcountryService,
    public stateService: TblshamelstateService,
    public tblshameluserservice: TBLShamelUserService,
    @Inject(MAT_DIALOG_DATA) public data: { obj: ITBLShamelSCCourse, id: number }
  ) {

    //في حال كانت البيانات مرسلة عن طريق Dialog
    if (data && data.obj && data.id > 0) {
      this.employee_id = data.id;
      this.Selected_Employee_Course = data.obj;
    }


    this.BuildForm();
    this.Load_Data();

  }
  //#endregion


  //#region  For Load Data
  Load_TBLShamelCountry(): Observable<ITBLShamelCountry[]> {
    if (this.countryService.List_ITBLShamelCountry == null ||
      this.countryService.List_ITBLShamelCountry == undefined ||
      this.countryService.List_ITBLShamelCountry.length == 0)
      return this.countryService.list();
    return of(this.countryService.List_ITBLShamelCountry);
  }

  Load_TBLShamelCourse(): Observable<ITBLShamelCourse[]> {
    if (this.courseService.List_ITBLShamelCourse == null ||
      this.courseService.List_ITBLShamelCourse == undefined ||
      this.courseService.List_ITBLShamelCourse.length == 0)
      return this.courseService.list();
    return of(this.courseService.List_ITBLShamelCourse);
  }

  Load_TBLShamelSpecification(): Observable<ITBLShamelSpecification[]> {
    if (this.specificationService.list_TBLShamelSpecification == null ||
      this.specificationService.list_TBLShamelSpecification == undefined ||
      this.specificationService.list_TBLShamelSpecification.length == 0)
      return this.specificationService.list();
    return of(this.specificationService.list_TBLShamelSpecification);
  }

  Load_State(): Observable<ITBLShamelState[]> {
    if (this.stateService.list_TBLShamelState == null ||
      this.stateService.list_TBLShamelState == undefined ||
      this.stateService.list_TBLShamelState.length == 0)
      return this.stateService.list();
    return of(this.stateService.list_TBLShamelState);
  }

  //تحميل المستخدم المسجل
  Load_Login_User(): Observable<TBLShamelUser> {

    if (this.tblshameluserservice.Login_User_BehavourSubject != null &&
      this.tblshameluserservice.Login_User_BehavourSubject.value != null &&
      this.tblshameluserservice.Login_User_BehavourSubject.value.user_id != null &&
      this.tblshameluserservice.Login_User_BehavourSubject.value.user_id > 0) {
      return this.tblshameluserservice.Login_User_BehavourSubject;
    }
    return of({});
  }

  Load_Data() {

    this.loading = true;

    combineLatest
      (
        this.PageService.Subject_Selected_TBLShamelEmployee
      ).subscribe(
        ([TBLShamelEmployee]) => {

          this.Selected_Emp = TBLShamelEmployee;
          this.employee_id = this.Selected_Emp.id;


          forkJoin(
            this.Load_Login_User(),
            this.Load_State(),
            this.Load_TBLShamelSpecification(),
            this.Load_TBLShamelCourse(),
            this.Load_TBLShamelCountry()

          ).subscribe(
            res => {
              this.Login_User = res[0];

              this.State_List = res[1];
              this.filteredStateOptions = of(this.State_List);
              this.stateService.list_TBLShamelState = res[1];
              this.stateService.List_TBLShamelState_BehaviorSubject.next(res[1]);

              this.Specification_List = res[2];
              this.filteredSpecificationOptions = of(this.Specification_List);
              this.specificationService.list_TBLShamelSpecification = res[2];
              this.specificationService.List_TBLShamelSpecification_BehaviorSubject.next(res[2]);



              this.Course_List = res[3];
              this.filteredCourseOptions = of(this.Course_List);
              this.courseService.List_ITBLShamelCourse = res[3];
              this.courseService.List_ITBLShamelCourse_BehaviorSubject.next(res[3]);


              this.Country_List = res[4];
              this.filteredCountryOptions = of(this.Country_List);
              this.countryService.List_ITBLShamelCountry = res[4];
              this.countryService.List_ITBLShamelCountry_BehaviorSubject.next(res[4]);


              this.Init_AutoComplete_FormControl();

              this.SetValue();

            }, (error: any) => {
              console.log(error)

            }

          )


        }
      )
  }
  //#endregion

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }


  //#region Fill Array

  public async Init_AutoComplete_FormControl() {


    this.filteredStateOptions = this.city_id.valueChanges
      .pipe(
        startWith(''),
        map(value => value && typeof value === 'string' ? this._filteredState(value) : this.State_List.slice())
      );




    this.filteredSpecificationOptions = this.Form.controls['specification_id'].valueChanges
      .pipe(
        startWith(''),
        map(value => value && typeof value === 'string' ? this._filteredSpecification(value) : this.Specification_List.slice())
      );



    this.filteredCourseOptions = this.Form.controls['course_id'].valueChanges
      .pipe(
        startWith(''),
        map(value => value && typeof value === 'string' ? this._filteredCourse(value) : this.Course_List.slice())
      );


    this.filteredCountryOptions = this.Form.controls['country_id'].valueChanges
      .pipe(
        startWith(''),
        map(value => value && typeof value === 'string' ? this._filteredCounty(value) : this.Country_List.slice())
      );



  }

  //#endregion

  //#region BuildForm
  public BuildForm() {
    try {

      //انشاء الفورم مع اسناد 

      this.Form = this.frmBuilder.group(
        {
          'serial':this.serial = new FormControl<number | null>(null, []),
          'id' :this.id = new FormControl<number | null>(null, []),
          'course_id': this.course_id = new FormControl<number | null>(null, [Validators.required]),
          'specification_id': this.specification_id = new FormControl<number | null>(null, []),
          'country_id': this.country_id = new FormControl<number | null>(null, []),
          'city_id': this.city_id = new FormControl<number | null>(null, []),
          'startdate': this.startdate = new FormControl<Date | null>(null, []),
          'enddate': this.enddate = new FormControl<Date | null>(null, []),
          'studyduration': this.studyduration = new FormControl<string | null>(null, []),
        },
        {
          updateOn: 'change',
          asyncValidators: ValidateForm(this.sccourseService).bind(this) // <= async validator
        }
      );
    } catch (Exception: any) {
    }
  }

  //#endregion


  //#region Filter Of  

  private _filteredSpecification(value: string): ITBLShamelSpecification[] {
    if (value != null) {
      const filterValue = value;
      return this.Specification_List.filter(obj => obj.specification_name.includes(filterValue));
    }
    return this.Specification_List.slice();
  }
  private _filteredCourse(value: string): ITBLShamelCourse[] {
    if (value != null) {
      const filterValue = value;
      return this.Course_List.filter(obj => obj.course_name.includes(filterValue));
    }
    return this.Course_List.slice();
  }
  private _filteredCounty(value: string): ITBLShamelCountry[] {
    if (value) {
      const filterValue = value;
      return this.Country_List.filter(obj => obj.country_name.includes(filterValue));

    }
    return this.Country_List.slice();
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

      if (this.Selected_Employee_Course != null &&
        this.Selected_Employee_Course != undefined) {


          if (this.Selected_Employee_Course.serial != null)
          this.Form.controls['serial'].setValue(this.Selected_Employee_Course.serial);


          if (this.Selected_Employee_Course.id != null)
          this.Form.controls['id'].setValue(this.Selected_Employee_Course.id);



        if (this.Selected_Employee_Course.City_ID != null)
          this.Form.controls['city_id'].setValue(this.Selected_Employee_Course.City_ID);


        if (this.Selected_Employee_Course.country_id != null)
          this.Form.controls['country_id'].setValue(this.Selected_Employee_Course.country_id);

        if (this.Selected_Employee_Course.course_id != null)
          this.Form.controls['course_id'].setValue(this.Selected_Employee_Course.course_id);

        if (this.Selected_Employee_Course.specification_id != null)
          this.Form.controls['specification_id'].setValue(this.Selected_Employee_Course.specification_id);

        if (this.Selected_Employee_Course.studyduration != null)
          this.Form.controls['studyduration'].setValue(this.Selected_Employee_Course.studyduration);


        if (this.Selected_Employee_Course.startdate != null &&
          this.Selected_Employee_Course.startdate != undefined
        ) {
          this.Form.controls['startdate'].setValue(moment(this.Selected_Employee_Course.startdate).toDate());
        }


        if (this.Selected_Employee_Course.enddate != null &&
          this.Selected_Employee_Course.enddate != undefined
        ) {
          this.Form.controls['enddate'].setValue(moment(this.Selected_Employee_Course.enddate).toDate());
        }

      }


    } catch (ex: any) {
      console.log(ex);

    }

  }

  public getValue() {
    try {

      if (this.Selected_Employee_Course != null) {

        if (this.Form.controls['serial'].value != null)
        this.Selected_Employee_Course.serial = this.Form.controls['serial'].value;

        
        if (this.Form.controls['id'].value != null)
        this.Selected_Employee_Course.id = this.Form.controls['id'].value;



        if (this.Form.controls['city_id'].value != null)
          this.Selected_Employee_Course.City_ID = this.Form.controls['city_id'].value;

        if (this.Form.controls['country_id'].value != null)
          this.Selected_Employee_Course.country_id = this.Form.controls['country_id'].value;

        if (this.Form.controls['course_id'].value != null)
          this.Selected_Employee_Course.course_id = this.Form.controls['course_id'].value;

        if (this.Form.controls['specification_id'].value != null)
          this.Selected_Employee_Course.specification_id = this.Form.controls['specification_id'].value;

        if (this.Form.controls['studyduration'].value != null)
          this.Selected_Employee_Course.studyduration = this.Form.controls['studyduration'].value;


        if (this.Form.controls['startdate'].value != null &&
          this.Form.controls['startdate'].value != undefined)
          this.Selected_Employee_Course.startdate = moment(this.Form.controls['startdate'].value).toDate();

        if (this.Form.controls['enddate'].value != null &&
          this.Form.controls['enddate'].value != undefined)
          this.Selected_Employee_Course.enddate = moment(this.Form.controls['enddate'].value).toDate();
      }
    } catch (ex: any) {

    }

  }
  //#endregion




  //#region OnSelect Function

  public OnSelectCountryChange(event: MatAutocompleteSelectedEvent) {
    if (event != null && this.Selected_Employee_Course != null)
      this.Selected_Employee_Course.country_id = event.option.value;
  }

  public OnSelectCourseChange(event: MatAutocompleteSelectedEvent) {
    if (event && this.Selected_Employee_Course)
      this.Selected_Employee_Course.course_id = event.option.value;
  }

  public OnSelectStateChange(event: MatAutocompleteSelectedEvent) {
    console.log('OnSelectStateChange');
    console.log(event.option.value);
    if (event && this.Selected_Employee_Course)
      this.Selected_Employee_Course.City_ID = event.option.value;
  }

  public OnSelectSpecificationChange(event: MatAutocompleteSelectedEvent) {
    if (event && this.Selected_Employee_Course)
      this.Selected_Employee_Course.specification_id = event.option.value;
  }

  //#endregion


  //#region  Display Display Member
  public displayCourseProperty(value: string): string {
    if (value && this.Course_List) {
      let course: any = this.Course_List.find(crs => crs.course_id.toString() == value);
      if (course != null)
        return course.course_name;
    }
    return '';
  }


  public displaySpecificationProperty(value: string): string {
    if (value && this.Specification_List) {

      let Specification: any = this.Specification_List.find(spec => spec.specification_id.toString() == value);
      if (Specification != null)
        return Specification.specification_name;
    }
    return '';
  }

  public displayStateProperty(value: string): string {

    console.log('displayStateProperty');
    console.log(value);
    console.log(this.State_List);
    if (value && this.State_List) {

      let state: any = this.State_List.find(obj => obj.state_id.toString() == value);
      console.log(state);

      if (state != null)
        return state.state_name;
    }
    return '';
  }

  public displayCountryProperty(value: string): string {
    if (value && this.Country_List) {
      let country: any = this.Country_List.find(obj => obj.country_id.toString() == value);
      if (country != null)
        return country.country_name;
    }
    return '';
  }
  //#endregion

  public ClearObject() {

    this.Selected_Employee_Course = {};

    this.Selected_Employee_Course.id = this.Selected_Emp.id;
  }

  public async Save() {

    if (this.ValidateForm() == false)
      return;

    this.getValue();

    console.log("this.Form.invalid" + this.Form.valid);


    if (this.Form.valid == false) {
      return;
    }
   
    if (this.Selected_Employee_Course != null &&
      (this.Selected_Employee_Course.serial == null ||
        this.Selected_Employee_Course.serial <= 0)) {
      this.sccourseService.add(this.Selected_Employee_Course).toPromise().then(res => {
        console.log(res)
        if (res == 1) {
          this.ClearObject();
          this.ClearForm();
        } else {



        }
      });
    }
    else if (this.Selected_Employee_Course != null &&
      this.Selected_Employee_Course != undefined &&
      this.Selected_Employee_Course.serial != null &&
      this.Selected_Employee_Course.serial > 0)
      this.sccourseService.update(this.Selected_Employee_Course).toPromise().then(res => {
        console.log(res)
        if (res == 1) {
          this.getValue();

        } else {
        }
      });


  }


  public ValidateForm(): boolean {
    let result: boolean = true;



    if (this.course_id.value == null || this.course_id.value == undefined) {

      this.course_id.setErrors({ invalid: true, required: true });
      result = false;

    }

    if (!this.specification_id.value == null || this.specification_id.value == undefined) {

      this.specification_id.setErrors({ 'Phone Number does not exist.': true });
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



  addEventStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
    if (event != null && event.value != null) {
      this.Selected_Employee_Course.startdate = moment(event.value).toDate();
      console.log('date');
      if (this.Selected_Employee_Course != null &&
        this.Selected_Employee_Course.startdate != null &&
        this.Selected_Employee_Course.enddate != null
      ) {
        console.log('date');
        var x = moment(this.Selected_Employee_Course.enddate).diff(moment(this.Selected_Employee_Course.startdate), 'days') // 0
        this.studyduration.setValue(x.toString());
        console.log(x);
      }
    }
  }

  addEventEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
    if (event != null && event.value != null) {

      this.Selected_Employee_Course.enddate = moment(event.value).toDate();

      if (this.Selected_Employee_Course != null &&
        this.Selected_Employee_Course.startdate != null &&
        this.Selected_Employee_Course.enddate != null
      ) {
        console.log('date');
        var x = moment(this.Selected_Employee_Course.enddate).diff(moment(this.Selected_Employee_Course.startdate), 'days') // 0
        this.studyduration.setValue(x.toString());
        console.log(x);
      }
    }

  }


}

