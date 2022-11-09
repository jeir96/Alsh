import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { IEmployeeNameList } from 'src/app/modules/shared/models/employees_department/IEmployeeNameList';
import { EmployeeServiceService } from 'src/app/modules/shared/services/employees_department/employee-service.service';
import { ViewTBLShamelEmployeeService } from 'src/app/modules/shared/services/employees_department/view-tbl-shamel-employee.service';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import {
  startWith, map, debounceTime, filter, switchMap, exhaustMap, tap, scan,
  takeWhile
} from "rxjs/operators";

@Component({
  selector: 'app-auto-complete-employee-name',
  templateUrl: './auto-complete-employee-name.component.html',
  styleUrls: ['./auto-complete-employee-name.component.scss']
})
export class AutoCompleteEmployeeNameComponent implements OnInit, OnDestroy {
  SearchForm: UntypedFormGroup;
  @Input() Autocomplete_EmployeeName_Ctrl = new UntypedFormControl('', []);

  EmployeeNameList: IEmployeeNameList[] = [];
  @Input("EmployeeNameList") set SetEmployeeNameList(data: IEmployeeNameList[]) {
    if (data && data.length) {
      this.EmployeeNameList = data;

    } else {
      this.EmployeeNameList = [];

    }
    this.getFilteredEmployeeNameList();
  }

  @Input() placeHolder: string; // placeholder for autocomplete@Input() appearance?: string; // appearance for autocomplete(eg: 'outline', 'legacy' etc...)@Output() optionSelected = new EventEmitter();// emits the option selected

  
  @Output() optionSelected = new EventEmitter();// emits the option selected





  filteredEmployeeNameList: Observable<IEmployeeNameList[]>;

  private nextPage$ = new Subject();




  constructor(private fb: UntypedFormBuilder,
    public restApi: EmployeeServiceService,

    public viewTBLShamelEmployeeService: ViewTBLShamelEmployeeService,
  ) {

    this.SearchForm = this.fb.group({
    });
    this.SearchForm.addControl('autocomplete_EmployeeName', this.Autocomplete_EmployeeName_Ctrl);

  }

  ngOnInit(): void {
    this.getFilteredEmployeeNameList();
  }

  getChangedValOfInput() {
    const filter$ = this.Autocomplete_EmployeeName_Ctrl.valueChanges.pipe(
      startWith(""),
      debounceTime(400)
      // Note: If the option value is bound to object, after selecting    the option
      // Note: the value will change from string to {}. We want to  perform search
      // Note: only when the type is string (no match)
      // filter(q => typeof q === 'string')
    );
    return filter$;
  }

  getFilteredEmployeeNameList() {

    const filter$ = this.getChangedValOfInput();

    this.filteredEmployeeNameList = filter$.pipe(
      switchMap(currInputVal => {
        // Note: Reset the page with every new seach text
        let currentPage = 1;
        return this.nextPage$.pipe(
          startWith(currentPage),
          // Note: Until the backend responds, ignore NextPage requests.
          exhaustMap(_ => this.getItems(currInputVal, currentPage)),
          tap(() => currentPage++),
          // Note: This is a custom operator because we also need the last emitted value.
          // Note: Stop if there are no more pages, or no results at all for   the current search text.
          takeWhile(p => p.length > 0, true),
          scan(
            (allProducts, newProducts) => allProducts.concat(newProducts)
          )
        );
      })
    );
  }


  private getItems(startsWith: any, page: number): Observable<IEmployeeNameList[]> {
    const take = 10;
    const skip = page > 0 ? (page - 1) * take : 0;
    let filterValue = "";
    if ((startsWith || {}).fullname) {
      filterValue = (startsWith.fullname || "");
    } else {
      filterValue = (startsWith || "").toString();
    }
    const filtered = this.EmployeeNameList.filter(
      (option: any) => option.fullname.indexOf(filterValue) >= 0
    );
    return of(filtered.slice(skip, skip + take));
  }


  onSelect(event: any) {
    this.optionSelected.emit(event);
  }


  onScroll() {
    this.nextPage$.next(null);
  }


  displayFn(data: any): string {
    return data && data.fullname ? data.fullname : '';
  }


  ngOnDestroy() {
    this.nextPage$.unsubscribe();
    if (this.optionSelected) {
      this.optionSelected.unsubscribe();
    }
  }



}
