import { TestBed } from '@angular/core/testing';

import { TBLShamelMonthService } from './tblshamel-month.service';

describe('TBLShamelMonthService', () => {
  let service: TBLShamelMonthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TBLShamelMonthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
