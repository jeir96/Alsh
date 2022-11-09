import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TBLShamelUser } from '../../models/employees_department/TBLShamelUser';
import { TBLShamelPrivilageServiceService } from '../../services/employees_department/tblshamel-privilage-service.service';
import { TBLShamelUserService } from '../../services/employees_department/tblshamel-user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;

  UserName = '';

  password = '';


  frm_password: FormControl<string | undefined>;
  frm_username: FormControl<string | undefined>;

  isLoadingResults = false;

  LoginResultState: string = '';

  constructor(private formBuilder: UntypedFormBuilder,
    private router: Router, public ShemlUserService: TBLShamelUserService,
    public shamelPrivilige: TBLShamelPrivilageServiceService) {
    this.loginForm = this.formBuilder.group({});
    this.frm_password = new FormControl<string | undefined>(null, Validators.required);
    this.frm_username = new FormControl<string | undefined>(null, Validators.required);
    this.loginForm.addControl('username', this.frm_username);
    this.loginForm.addControl('password', this.frm_password);


  }


  ngOnInit(): void {



  }

  Login() {

    let user: TBLShamelUser = {};
    user.username= this.loginForm.controls["username"].value;
    user.password = this.loginForm.controls["password"].value;
    this.isLoadingResults = true;

    this.ShemlUserService.login(user)

      .subscribe((res: any) => {


        console.log('Result of Login ');
        console.log(res);
        this.isLoadingResults = false;
        if (res === 'Error') {

          this.LoginResultState = 'اسم المستحدم أو كلمة السر خاطئة ';

        } else if (res. token != null && res.User!= null) {


          this.ShemlUserService.Login_User_BehavourSubject.next(res.User);

          localStorage.setItem('token', res.token);
          localStorage.setItem('User', res.User);


        //  this.shamelPrivilige.List_User_Windows('00100');

          this.router.navigate(['']);

        }

        return;
      }, (err) => {

        this.LoginResultState = 'حدث خطأ اثناء تسجيل الدخول ';
        console.log(err);
        this.isLoadingResults = false;
      });

  }


}
