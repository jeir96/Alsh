import { TestBed } from '@angular/core/testing';

import { TBLShamelAccounterService } from './tblshamel-accounter.service';

describe('TBLShamelAccounterService', () => {
  let service: TBLShamelAccounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TBLShamelAccounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
