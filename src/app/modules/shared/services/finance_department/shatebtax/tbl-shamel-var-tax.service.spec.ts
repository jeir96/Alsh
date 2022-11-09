import { TestBed } from '@angular/core/testing';

import { TblShamelVarTaxService } from './tbl-shamel-var-tax.service';

describe('TblShamelVarTaxService', () => {
  let service: TblShamelVarTaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblShamelVarTaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
