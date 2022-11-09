import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TBLShamelEmployee } from 'src/app/modules/shared/models/employees_department/TBLShamelEmployee';
import { TblShamelNewPayrolAdd } from 'src/app/modules/shared/models/finance_department/payrol/TblShamelNewPayrolAdd';
import { TblShamelNewPayrolAddDetail } from 'src/app/modules/shared/models/finance_department/payrol/TblShamelNewPayrolAddDetail';

@Injectable({
  providedIn: 'root'
})
export class TblShamelNewPayrolAddPageServiceService {

  id : number;
  id_BehaviorSubject : BehaviorSubject <number>;
  TblShamelNewPayrolAdd ?:TblShamelNewPayrolAdd ;
  TBLShamelEmployee:TBLShamelEmployee;
  TblShamelNewPayrolAdd_BehaviorSubject ?: BehaviorSubject < TblShamelNewPayrolAdd> ;
  TBLShamelEmployee_BehaviorSubject:BehaviorSubject<TBLShamelEmployee>;


  List_ta3weed: TblShamelNewPayrolAddDetail[]= [];
  List_taxtemp: TblShamelNewPayrolAddDetail[]= [];
  List_recurr: TblShamelNewPayrolAddDetail[]= [];
  
  
  constructor() { }
}
