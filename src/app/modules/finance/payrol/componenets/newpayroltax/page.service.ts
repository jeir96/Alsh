import { Injectable } from '@angular/core';
import { TblShamelNewPayrolTax } from 'src/app/modules/shared/models/finance_department/payrol/TblShamelNewPayrolTax';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  List_TblShamelNewPayrolTax:TblShamelNewPayrolTax[];

  constructor() { }
}
