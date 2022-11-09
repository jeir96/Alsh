import { TestBed } from '@angular/core/testing';

import { TBLShamelYearService } from './tblshamel-year.service';

describe('TBLShamelYearService', () => {
  let service: TBLShamelYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TBLShamelYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
