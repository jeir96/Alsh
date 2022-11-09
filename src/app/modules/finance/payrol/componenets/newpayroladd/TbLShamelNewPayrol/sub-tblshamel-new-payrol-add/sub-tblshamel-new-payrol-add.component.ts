import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TblShamelNewPayrolAddDetail } from 'src/app/modules/shared/models/finance_department/payrol/TblShamelNewPayrolAddDetail';
import { TblShamelNewPayrolTax } from 'src/app/modules/shared/models/finance_department/payrol/TblShamelNewPayrolTax';
import { TblShamelNewPayrolAddPageServiceService } from '../tbl-shamel-new-payrol-add-page-service.service';

@Component({
  selector: 'sub-tblshamel-new-payrol-add',
  templateUrl: './sub-tblshamel-new-payrol-add.component.html',
  styleUrls: ['./sub-tblshamel-new-payrol-add.component.scss']
})
export class SubTblshamelNewPayrolAddComponent implements OnInit, OnChanges  {

 
  get TblShamelNewPayrolAddDetail():TblShamelNewPayrolAddDetail
  {
    if (
      this.pageService.TblShamelNewPayrolAdd!= null &&
      this.pageService.TblShamelNewPayrolAdd.TblShamelNewPayrolAddDetails!= null &&
      this.pageService.TblShamelNewPayrolAdd.TblShamelNewPayrolAddDetails.length >0 &&
      this.index!= null &&
      this.index>=0 &&
      this.index<this.pageService.TblShamelNewPayrolAdd.TblShamelNewPayrolAddDetails.length      
        )
    {
      return this.pageService.TblShamelNewPayrolAdd.TblShamelNewPayrolAddDetails[this.index];
    }
    return {};
  }


  //ترتيب العنصر ضمن المصفوفة
  @Input() index : number ;
  // نوع السطر وذلك على حس 
  Form :FormGroup ;


  constructor(public pageService:TblShamelNewPayrolAddPageServiceService) { 
    this.BuildForm();
  }

  BuildForm()
  {
    this.Form = new FormGroup({
      serail: new FormControl<number|null>(null),
      tblshamelnewpayroladd_fk: new FormControl<number|null >(null),
      tblshamelnewpayroltax_fk :  new FormControl<number|null >(null),
      TblShamelNewPayrolTax:new FormControl<TblShamelNewPayrolTax|null >(null),
      name:new FormControl<string|null >(null),
      ta3weed_amount:  new FormControl<number|null >(null),
      ta3weed_percent:  new FormControl<number|null >(null),
      ta3weed_active :  new FormControl<number|null >(null),
      ta3weed_order :  new FormControl<number|null >(null),
      taxtemp_amount  :  new FormControl<number|null >(null),
      taxtemp_percent  :  new FormControl<number|null >(null),
      taxtemp_active   :  new FormControl<number|null >(null),
      taxtemp_order   :  new FormControl<number|null >(null),
      taxrecurr_fee    :  new FormControl<number|null >(null),
      taxrecurr_balance:  new FormControl<number|null >(null),
      taxrecurr_total :  new FormControl<number|null >(null),
      taxrecurr_order :  new FormControl<number|null >(null),
      taxrecurr_active :  new FormControl<number|null >(null),      
    });
  }
 
  bindValue ()
  {
    if (this.Form!= null)
    {
      if (this.TblShamelNewPayrolAddDetail!= null && 
          this.TblShamelNewPayrolAddDetail.TblShamelNewPayrolTax!= null)
        {
          this.Form.controls['TblShamelNewPayrolTax'].setValue(this.TblShamelNewPayrolAddDetail.TblShamelNewPayrolTax);

          if (this.TblShamelNewPayrolAddDetail.TblShamelNewPayrolTax.payroltaxtype!= null &&
              this.TblShamelNewPayrolAddDetail.TblShamelNewPayrolTax.payroltaxtype=='تعويض')              
           this.Form.controls['name'].setValue(this.TblShamelNewPayrolAddDetail.TblShamelNewPayrolTax.ta3weed_name);
           else if (this.TblShamelNewPayrolAddDetail.TblShamelNewPayrolTax.payroltaxtype!= null &&
            this.TblShamelNewPayrolAddDetail.TblShamelNewPayrolTax.payroltaxtype=='حسميات')              
         this.Form.controls['name'].setValue(this.TblShamelNewPayrolAddDetail.TblShamelNewPayrolTax.taxtempp_name);
         else if (this.TblShamelNewPayrolAddDetail.TblShamelNewPayrolTax.payroltaxtype!= null &&
          this.TblShamelNewPayrolAddDetail.TblShamelNewPayrolTax.payroltaxtype=='متغيرة')              
       this.Form.controls['name'].setValue(this.TblShamelNewPayrolAddDetail.TblShamelNewPayrolTax.taxrecurr_name);
          
        }

        if (this.TblShamelNewPayrolAddDetail!= null && 
          this.TblShamelNewPayrolAddDetail.ta3weed_active!= null)
        {
          this.Form.controls['ta3weed_active'].setValue(this.TblShamelNewPayrolAddDetail.ta3weed_active);
        }

        if (this.TblShamelNewPayrolAddDetail!= null && 
          this.TblShamelNewPayrolAddDetail.ta3weed_amount!= null)
        {
          this.Form.controls['ta3weed_amount'].setValue(this.TblShamelNewPayrolAddDetail.ta3weed_amount);
        }

        if (this.TblShamelNewPayrolAddDetail!= null && 
          this.TblShamelNewPayrolAddDetail.ta3weed_percent!= null)
        {
          this.Form.controls['ta3weed_percent'].setValue(this.TblShamelNewPayrolAddDetail.ta3weed_percent);
        }

        if (this.TblShamelNewPayrolAddDetail!= null && 
          this.TblShamelNewPayrolAddDetail.taxrecurr_balance!= null)
        {
          this.Form.controls['taxrecurr_balance'].setValue(this.TblShamelNewPayrolAddDetail.taxrecurr_balance);
        }

        if (this.TblShamelNewPayrolAddDetail!= null && 
          this.TblShamelNewPayrolAddDetail.taxrecurr_fee!= null)
        {
          this.Form.controls['taxrecurr_fee'].setValue(this.TblShamelNewPayrolAddDetail.taxrecurr_fee);
        }

        if (this.TblShamelNewPayrolAddDetail!= null && 
          this.TblShamelNewPayrolAddDetail.taxrecurr_order!= null)
        {
          this.Form.controls['taxrecurr_order'].setValue(this.TblShamelNewPayrolAddDetail.taxrecurr_order);
        }

        if (this.TblShamelNewPayrolAddDetail!= null && 
          this.TblShamelNewPayrolAddDetail.taxrecurr_total!= null)
        {
          this.Form.controls['taxrecurr_total'].setValue(this.TblShamelNewPayrolAddDetail.taxrecurr_total);
        }

        if (this.TblShamelNewPayrolAddDetail!= null && 
          this.TblShamelNewPayrolAddDetail.taxtemp_active!= null)
        {
          this.Form.controls['taxtemp_active'].setValue(this.TblShamelNewPayrolAddDetail.taxtemp_active);
        }

        if (this.TblShamelNewPayrolAddDetail!= null && 
          this.TblShamelNewPayrolAddDetail.taxtemp_amount!= null)
        {
          this.Form.controls['taxtemp_amount'].setValue(this.TblShamelNewPayrolAddDetail.taxtemp_amount);
        }

        if (this.TblShamelNewPayrolAddDetail!= null && 
          this.TblShamelNewPayrolAddDetail.taxtemp_percent!= null)
        {
          this.Form.controls['taxtemp_percent'].setValue(this.TblShamelNewPayrolAddDetail.taxtemp_percent);
        }

        if (this.TblShamelNewPayrolAddDetail!= null && 
          this.TblShamelNewPayrolAddDetail.tblshamelnewpayroladd_fk!= null)
        {
          this.Form.controls['tblshamelnewpayroladd_fk'].setValue(this.TblShamelNewPayrolAddDetail.tblshamelnewpayroladd_fk);
        }

        if (this.TblShamelNewPayrolAddDetail!= null && 
          this.TblShamelNewPayrolAddDetail.tblshamelnewpayroltax_fk!= null)
        {
          this.Form.controls['tblshamelnewpayroltax_fk'].setValue(this.TblShamelNewPayrolAddDetail.tblshamelnewpayroltax_fk);
        }

        if (this.TblShamelNewPayrolAddDetail!= null && 
          this.TblShamelNewPayrolAddDetail.tblshamelnpayroladddet_serail!= null)
        {
          this.Form.controls['tblshamelnpayroladddet_serail'].setValue(this.TblShamelNewPayrolAddDetail.tblshamelnpayroladddet_serail);
        }

    }


  }

  ngOnChanges(changes: SimpleChanges) {   
    if ( changes!= null && changes['index']!=null)    
    {
      this.index = changes['index'].currentValue ;
      this.bindValue();
    }
      

    
  }
  

  ngOnInit(): void {
  }

  bindModelToForm(model: any, form: FormGroup) {
    if (model== null ||  form == null)
    return;
    const keys = Object.keys(form.controls);
    keys.forEach(key => {
      
        form.controls[key].valueChanges.subscribe(
            (newValue) => {
                model[key] = newValue;
            }
        )
    });
}

}
