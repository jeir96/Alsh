import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemePalette } from '@angular/material/core';
import * as moment from 'moment';
import { TBLShamelDaera } from '../../../models/employees_department/TBLShamelDaera';
import { TBLShamelUser } from '../../../models/employees_department/TBLShamelUser';
import { TBLShamelDaeraService } from '../../../services/employees_department/tblshamel-daera.service';
import { TBLShamelUserService } from '../../../services/employees_department/tblshamel-user.service';

@Component({
  selector: 'app-tblshamel-user-edit',
  templateUrl: './tblshamel-user-edit.component.html',
  styleUrls: ['./tblshamel-user-edit.component.scss']
})
export class TBLShamelUserEditComponent implements OnInit,AfterViewInit {

  //Link To Employee   
  Selected_User :TBLShamelUser;

  //Array Of AutoComplere With Filter
  TBLShamelDaera_List :TBLShamelDaera[]=[];
  filteredDaeraOptions: Observable<TBLShamelDaera[]>;  

  @ViewChild('picker') picker: any;
  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  public listColors = ['primary', 'accent', 'warn'];

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];
pp:any;
  
  // Access To Element in Form
  Form: UntypedFormGroup ;
  user_id   = new UntypedFormControl();
  fullname = new UntypedFormControl();
  daera_id = new UntypedFormControl();
  username = new UntypedFormControl();
  password = new UntypedFormControl();
  hdserial = new UntypedFormControl();
  entermintime= new UntypedFormControl();
  entermaxtime= new UntypedFormControl();
  enabled = new UntypedFormControl();
  imgfile= new UntypedFormControl();
  file= new UntypedFormControl();
  name = new UntypedFormControl();

  //Local Var


 
  loading: boolean = false;

  //#region Constuctor 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {obj: TBLShamelUser},  
    public UserService:TBLShamelUserService,
    public DaeraService:TBLShamelDaeraService,
    private fb: UntypedFormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.loading = true;
    if (data && data.obj )
    {       
      this.Selected_User = data.obj;

      
          console.log('fdfd gdf');
        
        //  this.Selected_User.photo =window.btoa(this.Selected_User.photo);

        this.Selected_User.photo = 'data:image/jpg;base64,' + this.Selected_User.photo;

          console.log(this.Selected_User.photo);
    }    
    this.FillArrayUsingService();
    this.BuildForm();
    this.SetValue();      
   }
   //#endregion

   //#region  Init Component

   ngOnInit(): void {
    this.FillArrayUsingService();
    console.log('ngOnInit');
     this.SetValue();
  }


  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this.SetValue();
  }

  
    public async FillArrayUsingService()
   {
     try{

       if (!this.TBLShamelDaera_List || this.TBLShamelDaera_List.length<=0)
       {
         
        this.DaeraService.list().subscribe(
          (data:any)=> {
            this.loading = false;
            console.log('load Daera');
            console.log(data);
            this.TBLShamelDaera_List=data;      
          });


      
       }
       
       this.filteredDaeraOptions = this.daera_id.valueChanges
       .pipe(
         startWith(''),        
         map(value => value   && typeof value === 'string'  ? this._filteredDaera(value) : this.TBLShamelDaera_List.slice() )
       );  
     
      
    }catch(Exception : any)
    {}



   }
  
   public BuildForm()
   {
     try{  
      console.log('Build Form' );  
       console.log(this.Selected_User );  
    if (this.Selected_User && this.Selected_User.user_id>0)
    {

    
      this.user_id   = new UntypedFormControl({value: this.Selected_User.user_id, disabled: false},[Validators.required, Validators.minLength(5)]);
      this.fullname = new UntypedFormControl(this.Selected_User.fullname,[ Validators.required ]);
      this.daera_id = new UntypedFormControl({value: this.Selected_User.daera_id, disabled: false},[Validators.required, Validators.minLength(5)]);
      this.username= new UntypedFormControl(this.Selected_User.username,[ Validators.required ]);


      this.password = new UntypedFormControl(this.Selected_User.password,[ Validators.required ]);
      this.hdserial = new UntypedFormControl(this.Selected_User.hdserial,[ Validators.required ]);
      this.entermintime = new UntypedFormControl(this.Selected_User.entermintime,[ Validators.required ]);
      this.entermaxtime = new UntypedFormControl(this.Selected_User.entermaxtime,[ Validators.required ]);
      
      this.enabled = new UntypedFormControl(this.Selected_User.enabled,[ Validators.required ]);



      
      
      
      
      


    
    }else
    {
      this.user_id   = new UntypedFormControl({value: this.Selected_User.user_id, disabled: false},[Validators.required, Validators.minLength(5)]);
      this.fullname = new UntypedFormControl(this.Selected_User.fullname,[ Validators.required ]);
      this.daera_id = new UntypedFormControl({value: this.Selected_User.daera_id, disabled: false},[Validators.required, Validators.minLength(5)]);
      this.username= new UntypedFormControl(this.Selected_User.username,[ Validators.required ]);


      this.password = new UntypedFormControl(this.Selected_User.password,[ Validators.required ]);
      this.hdserial = new UntypedFormControl(this.Selected_User.hdserial,[ Validators.required ]);
      this.entermintime = new UntypedFormControl(this.Selected_User.entermintime,[ Validators.required ]);
      this.entermaxtime = new UntypedFormControl(this.Selected_User.entermaxtime,[ Validators.required ]);
      
      this.enabled = new UntypedFormControl(this.Selected_User.enabled,[ Validators.required ]);

    }

      this.Form = this.fb.group({
        });
        this.Form .addControl('User_ID',this.user_id);        
        this.Form .addControl('FullName',this.fullname);
        this.Form .addControl('Daera_ID',this.daera_id);
        this.Form .addControl('UserName',this.username);        
        this.Form .addControl('Password',this.password);
        this.Form .addControl('HDSERIAL',this.hdserial);
        this.Form .addControl('EnterMinTime',this.entermintime);
        this.Form .addControl('EnterMaxTime',this.entermaxtime);    
        this.Form .addControl('Enabled',this.enabled);
        this.Form .addControl('imgFile',this.imgfile);
        this.Form .addControl('file',this.file);
        this.Form .addControl('name',this.name);

  

      }catch(Exception:any){
        console.log(Exception);
      }
   }
   //#endregion


   //#region Filter Of  

   private _filteredDaera(value: string): TBLShamelDaera[] {    
    if (value)
    {
    const filterValue = value ;
    return this.TBLShamelDaera_List.filter(obj => obj.daera_name.includes(filterValue) );
    }
    return this.TBLShamelDaera_List.slice();
  }

  
  //#endregion


  //#region SetValue And GetValue Function
  public ClearForm()
  {
    try{
      console.log('ClearForm');
      this.user_id.reset();
      this.fullname.reset();
      this.daera_id.reset();
      this.username.reset();
      this.password.reset();    
      this.hdserial.reset();    
      this.entermintime.reset();    
      this.entermaxtime.reset();    
      
      this.enabled.reset();    


  }catch(ex: any)
  {

  }
  
  }


  //#region SetValue And GetValue Function
  public SetValue()
  {
    try{
   

      console.log(this.Selected_User);
  
this.Form.patchValue(
  {
    
    User_ID:this.Selected_User.user_id,
    FullName:this.Selected_User.fullname,
    Daera_ID:this.Selected_User.daera_id,   
    UserName:this.Selected_User.username,
    Password:this.Selected_User.password,
    HDSERIAL:this.Selected_User.hdserial,
    EnterMinTime:this.Selected_User.entermintime,
    EnterMaxTime:this.Selected_User.entermaxtime,    
    Enabled:this.Selected_User.enabled,
  }
);
this.daera_id.setValue(this.Selected_User.daera_id);
 
  this.loading = false; 
  console.log('complete');

 

  }catch(ex: any)
  {
    console.log(ex);

  }
  
  }

  public getValue()
  {
    try{

if (this.Selected_User )
{
  
    this.Selected_User.user_id= this.user_id.value;
    this.Selected_User.daera_id = this.daera_id.value;
    this.Selected_User.enabled= this.enabled.value;        
    this.Selected_User.fullname= this.fullname.value;

    this.Selected_User.entermintime= this.entermintime.value;
    this.Selected_User.entermaxtime= this.entermaxtime.value;

    this.Selected_User.username= this.username.value;
    this.Selected_User.password= this.password.value;
    this.Selected_User.hdserial= this.hdserial.value;

    
    
    
  }
  }catch(ex: any)
  {

  }
  

  }
//#endregion

 

  //#region OnSelect Function

  public OnSelectDaeraChange(event: MatAutocompleteSelectedEvent) {
    if (event  && this.Selected_User )
      this.Selected_User.daera_id= event.option.value;  
  }

 
  

  //#endregion


  //#region  Display Display Member
  public displayDaeraProperty(value:string):string  {
    if (value && this.TBLShamelDaera_List){     
      let Daera:any = this.TBLShamelDaera_List.find(crs => crs.daera_id.toString() == value) ;
      if (Daera)
      return Daera.Daera_Name;
    }
    return '';
  }


  
 

  public ClearObject()
  {
    if (!this.Selected_User)
    this.Selected_User = {};
  
  }

//btoa("username:temppass")
/*
Use the btoa() function to encode:
The WindowOrWorkerGlobalScope.btoa() method creates a base-64 encoded ASCII string from a String object in which each character in the string is treated as a byte of binary data.

To decode, you can use the atob() function:
console.log(atob("dXNlcm5hbWU6dGVtcHBhc3M=")); // username:temppass
*/


   utf8_to_b64( str :string) :string
   {
    return window.btoa(unescape(encodeURIComponent( str )));
  }
  

   b64_to_utf8( str:string ) :string{
    return decodeURIComponent(escape(window.atob( str )));
  }

  

  public async Save()
  {
 



   
    console.log("this.Form.invalid"+this.Form.errors);

    /*
    if (this.Form.invalid == true) {
      return;
    }
*/


if (
  this.Selected_User.photo &&
  this.Selected_User.photo.length>0 )
  {
    this.Selected_User.photo =this.Selected_User.photo.toString();
  }



    this.getValue();

    if (this.Selected_User  &&
      this.Selected_User.user_id<=0)
      {

      if (this.ValidateForm())
        this.UserService.add(this.Selected_User).toPromise().then((res:any) => {
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
   else if (this.Selected_User  &&
             this.Selected_User.user_id>0)
             {
               console.log('update');
               console.log(this.Selected_User);

      this.UserService.update(this.Selected_User).toPromise().then((res:any) => {
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



    

    console.log("result vaildarw"+result);
    return result;
    
  }

  public onReset(): void {
   
    this.Form.reset();
  }
/* Handle form errors in Angular 8 */
public errorHandling = (control: string, error: string) => {
  return this.Form.controls[control].hasError(error);
}



addEventDocumentDate(type: string, event: MatDatepickerInputEvent<Date>) {

  //this.Selected_User.documentdate = moment(event.value).format('YYYY/MM/DD');

}

onImageChange(e:any) {

  if(e.target.files && e.target.files.length) {

  // HTML5 FileReader API
  let filereader = new FileReader();
  filereader.readAsDataURL(e.target.files[0]);


  filereader.onload = (e: any) => {
    let image = new Image();    
    image.src = e.target.result;
    image.onload = rs => {
       this.Selected_User.photo  =e.target.result;
    };
  };
  filereader.onerror = function (error:any) {
    console.log('Error: ', error);
    console.log('Error: ', error);
  };
  
  }



}

}
