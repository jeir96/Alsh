import { TestBed } from '@angular/core/testing';

import { TblshamelPrintFooterService } from './tblshamel-print-footer.service';

describe('TblshamelPrintFooterService', () => {
  let service: TblshamelPrintFooterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblshamelPrintFooterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
