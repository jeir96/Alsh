import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, Observable, of } from 'rxjs';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { TBLShamelMonth } from 'src/app/modules/shared/models/employees_department/TBLShamelMonth';
import { TBLShamelYear } from 'src/app/modules/shared/models/employees_department/TBLShamelYear';
import { TblShamelNewPayrolAdd } from 'src/app/modules/shared/models/finance_department/payrol/TblShamelNewPayrolAdd';
import { TblShamelNewPayrolAddDetail } from 'src/app/modules/shared/models/finance_department/payrol/TblShamelNewPayrolAddDetail';
import { TblShamelNewPayrolAddRequest } from 'src/app/modules/shared/models/finance_department/payrol/tblShamelNewPayrolAddRequest';
import { TblShamelNewPayrolTax } from 'src/app/modules/shared/models/finance_department/payrol/TblShamelNewPayrolTax';
import { EmployeeServiceService } from 'src/app/modules/shared/services/employees_department/employee-service.service';
import { TBLShamelAccounterService } from 'src/app/modules/shared/services/employees_department/tblshamel-accounter.service';
import { TBLShamelMonthService } from 'src/app/modules/shared/services/employees_department/tblshamel-month.service';
import { TBLShamelYearService } from 'src/app/modules/shared/services/employees_department/tblshamel-year.service';
import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';
import { TblShamelNewPayrolAddService } from 'src/app/modules/shared/services/finance_department/payrol/tbl-shamel-new-payrol-add.service';
import { TblShamelNewPayrolTaxService } from 'src/app/modules/shared/services/finance_department/payrol/tbl-shamel-new-payrol-tax.service';
import { TaxDialogComponent } from '../../tax-dialog/tax-dialog.component';
import { TblShamelNewPayrolAddPageServiceService } from '../tbl-shamel-new-payrol-add-page-service.service';

@Component({
  selector: 'app-new-payrol-add',
  templateUrl: './tblshamel-new-payrol-add.component.html',
  styleUrls: ['./tblshamel-new-payrol-add.component.scss']
})
export class TbLShamelNewPayrolAddComponent implements OnInit {
  Form: FormGroup;
  List_TblShamelNewPayrolTax: TblShamelNewPayrolTax[] = [];

  Fixed_Month: TBLShamelMonth;
  Fixed_Year: TBLShamelYear;


  repayment: string = "";
  amount: string = "";
  rate: string = "";
  checked: boolean = false;
  deductive: string = "";
  deductiveName: string = "";
  total: string = "";
  installment: string = "";
  stock: string = "";

  updateList: TblShamelNewPayrolAddRequest[] = [];
  AddDetailsList: TblShamelNewPayrolAddDetail[] = [];

  errorMsg: any;




  constructor(
    private frmBuilder: FormBuilder,
    public pageService: TblShamelNewPayrolAddPageServiceService,
    public viewTBLShamelEmployeeService: ViewTBLShamelEmployeeService,
    private tblShamelAccounterService: TBLShamelAccounterService,
    private tblShamelNewPayrolAddService: TblShamelNewPayrolAddService,
    public dialog: MatDialog,
    public employeeService: EmployeeServiceService,
    public ShamelMonthService: TBLShamelMonthService,
    public ShamelYearService: TBLShamelYearService,
    private tblShamelNewPayrolTaxService: TblShamelNewPayrolTaxService) {


    this.BuildForm();

    if (this.pageService.id_BehaviorSubject!= null  )
    this.pageService.id_BehaviorSubject.subscribe
      (
        emp => {
          this.LoadData();
        }
      )
  }

  BuildForm() {

    this.Form = this.frmBuilder.group({
      'id': new FormControl<number | null>(null),
      'payrol_id': new FormControl<string | null>(null),
      'wife': new FormControl<string | null>(null),
      'family': new FormControl<string | null>(null),
      'FirstChild': new FormControl<number | null>(null),
      'SecondChild': new FormControl<number | null>(null),
      'ThirdChild': new FormControl<number | null>(null),
      'FourChild': new FormControl<number | null>(null),
      'RestChild': new FormControl<number | null>(null),
      'family_ta3weed': new FormControl<number | null>(null),
      'insurance_kind': new FormControl<number | null>(null),
      'locked': new FormControl<string | null>(null),
      'salary_old': new FormControl<number | null>(null),
      'salary_last_jobstate': new FormControl<number | null>(null),
      'salary_insurance': new FormControl<number | null>(null)

    });
  }


  load_Employee(): Observable<TBLShamelEmployee> {

    if (this.pageService.id != null && this.pageService.id > 0)
      return this.employeeService.search_by_id_mini(this.pageService.id);

    return of();
  }

  load_TblShamelNewPayrolAdd(): Observable<TblShamelNewPayrolAdd> {

    if (this.pageService.id != null && this.pageService.id > 0)
      return this.tblShamelNewPayrolAddService.getById(this.pageService.id);
    return of();
  }


  Load_TblShamelNewPayrolTax(): Observable<TblShamelNewPayrolTax[]> {
    if (this.tblShamelNewPayrolTaxService.List_TblShamelNewPayrolTax == null ||
      this.tblShamelNewPayrolTaxService.List_TblShamelNewPayrolTax == undefined ||
      this.tblShamelNewPayrolTaxService.List_TblShamelNewPayrolTax.length == 0)
      return this.tblShamelNewPayrolTaxService.list();
    return of(this.tblShamelNewPayrolTaxService.List_TblShamelNewPayrolTax);
  }

  LoadMonth(): Observable<TBLShamelMonth> {
    return this.ShamelMonthService.GetMonthFixed();

  }


  LoadYear(): Observable<TBLShamelYear> {

    return this.ShamelYearService.GetYearFixed();

  }
  LoadData() {

    forkJoin(
      [this.Load_TblShamelNewPayrolTax(),
      this.LoadYear(),
      this.LoadMonth(),
      this.load_Employee(),
      this.load_TblShamelNewPayrolAdd()
      ]
    ).subscribe(res => {

      this.List_TblShamelNewPayrolTax = res[0];
      this.tblShamelNewPayrolTaxService.List_TblShamelNewPayrolTax = res[0];
      this.tblShamelNewPayrolTaxService.List_TblShamelNewPayrolTax_BehaviorSubject.next(res[0]);


      this.Fixed_Year = res[1];
      this.Fixed_Month = res[2];

      this.pageService.TBLShamelEmployee = res[3];
      this.pageService.TBLShamelEmployee_BehaviorSubject.next(res[3]);

      this.pageService.TblShamelNewPayrolAdd = res[4];
      this.pageService.TblShamelNewPayrolAdd_BehaviorSubject.next(res[4]);


      let TblShamelNewPayrolAddDetails: TblShamelNewPayrolAddDetail[] = [];
      this.List_TblShamelNewPayrolTax.forEach(element => {
        let Detail: TblShamelNewPayrolAddDetail = {
          tblshamelnewpayroladd_fk: this.pageService.TblShamelNewPayrolAdd.id,
          tblshamelnewpayroltax_fk: element.serial
        };

        Detail.TblShamelNewPayrolTax = element;

        switch (element.payroltaxtype) {
          case 'ta3weed':
            Detail.name = element.ta3weed_name;
            break;
          case 'taxtemp':
            Detail.name = element.taxtemp_name;
            break;
          case 'recurr':
            Detail.name = element.taxrecurr_name;
            break;
        }


        Detail.tblshamelnewpayroladd_fk = this.pageService.TblShamelNewPayrolAdd.id;
        Detail.tblshamelnewpayroltax_fk = element.serial;
        var payrollDetail = this.pageService.TblShamelNewPayrolAdd.TblShamelNewPayrolAddDetails.find(x => x.tblshamelnewpayroltax_fk == element.serial);

        if (payrollDetail != null) {
          Detail.ta3weed_active = payrollDetail.ta3weed_active;
          Detail.ta3weed_amount = payrollDetail.ta3weed_amount;
          Detail.ta3weed_percent = payrollDetail.ta3weed_percent;
          Detail.taxrecurr_balance = payrollDetail.taxrecurr_balance;
          Detail.taxrecurr_fee = payrollDetail.taxrecurr_fee;
          Detail.taxrecurr_order = payrollDetail.taxrecurr_order;
          Detail.taxrecurr_total = payrollDetail.taxrecurr_total;
          Detail.taxtemp_amount = payrollDetail.taxtemp_amount;
          Detail.taxtemp_order = payrollDetail.taxtemp_order;
          Detail.taxtemp_percent = payrollDetail.taxtemp_percent;
          Detail.taxtemp_active = payrollDetail.taxtemp_active;
          Detail.ta3weed_active = payrollDetail.ta3weed_active;
          Detail.taxrecurr_active = payrollDetail.taxrecurr_active;
        }

        TblShamelNewPayrolAddDetails.push(Detail);

      });

      this.pageService.List_ta3weed = this.pageService.TblShamelNewPayrolAdd.TblShamelNewPayrolAddDetails.filter(x => x.TblShamelNewPayrolTax != null && x.TblShamelNewPayrolTax.payroltaxtype == 'ta3weed');
      this.pageService.List_taxtemp = this.pageService.TblShamelNewPayrolAdd.TblShamelNewPayrolAddDetails.filter(x => x.TblShamelNewPayrolTax != null && x.TblShamelNewPayrolTax.payroltaxtype == 'taxtemp');
      this.pageService.List_recurr = this.pageService.TblShamelNewPayrolAdd.TblShamelNewPayrolAddDetails.filter(x => x.TblShamelNewPayrolTax != null && x.TblShamelNewPayrolTax.payroltaxtype == 'taxRecurr');


      this.BindValue();

    },
      (error) => console.log(error));

  }


  ngOnInit(): void {


  }










  calcFamilyRepayment() {

    if (this.pageService.TblShamelNewPayrolAdd != null) {
      this.pageService.TblShamelNewPayrolAdd.FirstChild = +this.Form.controls['familyChildFirst'].value;
      this.pageService.TblShamelNewPayrolAdd.SecondChild = +this.Form.controls['familyChildSecond'].value;
      this.pageService.TblShamelNewPayrolAdd.ThirdChild = +this.Form.controls['familyChildThird'].value;
      this.pageService.TblShamelNewPayrolAdd.FourChild = +this.Form.controls['familyChildFourth'].value;
      this.pageService.TblShamelNewPayrolAdd.wife = this.Form.controls['wife'].value;
      this.pageService.TblShamelNewPayrolAdd.family = this.Form.controls['familyChildFourth'].value + this.Form.controls['familyChildThird'].value +
        this.Form.controls['familyChildSecond'].value + this.Form.controls['familyChildFirst'].value;
      this.pageService.TblShamelNewPayrolAdd.fill_child_info_from_family();
      this.Form.controls['family_ta3weed'].setValue(this.pageService.TblShamelNewPayrolAdd.calc_family_ta3weed());


    }
  }

  BindValue() {


    if (this.pageService.TBLShamelEmployee != null &&
      this.pageService.TBLShamelEmployee.TBLShamelSCJobState_Last != null &&
      this.pageService.TBLShamelEmployee.TBLShamelSCJobState_Last.salary != null
    )
      this.Form.controls['salary_last_jobstate'].setValue(this.pageService.TBLShamelEmployee.TBLShamelSCJobState_Last.salary);


    if (this.pageService.TBLShamelEmployee != null &&
      this.pageService.TBLShamelEmployee.InsuranceSalary != null
    )
      this.Form.controls['salary_insurance'].setValue(this.pageService.TBLShamelEmployee.InsuranceSalary);


    if (this.pageService.TBLShamelEmployee != null &&
      this.pageService.TBLShamelEmployee.Payrol_ID != null
    )
      this.Form.controls['payrol_id'].setValue(this.pageService.TBLShamelEmployee.Payrol_ID);


    if (this.pageService.TBLShamelEmployee != null &&
      this.pageService.TBLShamelEmployee.Payrol_ID != null
    )
      this.Form.controls['payrol_id'].setValue(this.pageService.TBLShamelEmployee.Payrol_ID);

    if (this.pageService.TblShamelNewPayrolAdd != null) {
      //يحوي بيانات
      if (this.pageService.TblShamelNewPayrolAdd.salary_insurance != null)
        this.Form.controls['salary_insurance'].setValue(this.pageService.TblShamelNewPayrolAdd.salary_insurance);

      if (this.pageService.TblShamelNewPayrolAdd.insurance_kind != null)
        this.Form.controls['insurance_kind'].setValue(this.pageService.TblShamelNewPayrolAdd.insurance_kind);

      if (this.pageService.TblShamelNewPayrolAdd.family_ta3weed != null)
        this.Form.controls['family_ta3weed'].setValue(this.pageService.TblShamelNewPayrolAdd.family_ta3weed);

      if (this.pageService.TblShamelNewPayrolAdd.family != null)
        this.Form.controls['family'].setValue(this.pageService.TblShamelNewPayrolAdd.family);

      if (this.pageService.TblShamelNewPayrolAdd.FirstChild != null)
        this.Form.controls['FirstChild'].setValue(this.pageService.TblShamelNewPayrolAdd.FirstChild);

      if (this.pageService.TblShamelNewPayrolAdd.SecondChild != null)
        this.Form.controls['SecondChild'].setValue(this.pageService.TblShamelNewPayrolAdd.SecondChild);


      if (this.pageService.TblShamelNewPayrolAdd.ThirdChild != null)
        this.Form.controls['ThirdChild'].setValue(this.pageService.TblShamelNewPayrolAdd.ThirdChild);

      if (this.pageService.TblShamelNewPayrolAdd.FourChild != null)
        this.Form.controls['FourChild'].setValue(this.pageService.TblShamelNewPayrolAdd.FourChild);


      if (this.pageService.TblShamelNewPayrolAdd.RestChild != null)
        this.Form.controls['RestChild'].setValue(this.pageService.TblShamelNewPayrolAdd.RestChild);

      if (this.pageService.TblShamelNewPayrolAdd.wife != null)
        this.Form.controls['wife'].setValue(this.pageService.TblShamelNewPayrolAdd.wife);




    } else {
      //لا يحوي بيانات

    }















  }



  taxClicked() {
    if (this.pageService.TBLShamelEmployee != null) {
      const dialogRef = this.dialog.open(TaxDialogComponent, {
        width: '750px',
        data: this.pageService.TBLShamelEmployee.id,
      });

      dialogRef.afterClosed().subscribe(() => {

      });
    }
  }

  save() {
    var request: TblShamelNewPayrolAdd;
    for (let i = 0; i < this.updateList.length; i++) {
      this.tblShamelNewPayrolAddService.getById(this.updateList[i].id).subscribe(
        res => {
          request = res;
          request.id = this.updateList[i].id;
          request.TblShamelNewPayrolAddDetails = this.updateList[i].TblShamelNewPayrolAddDetails;

        }
      );
      this.tblShamelNewPayrolAddService.update(request);

    }
  }


}
