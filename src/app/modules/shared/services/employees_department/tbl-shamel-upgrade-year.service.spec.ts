import { TestBed } from '@angular/core/testing';

import { TblShamelUpgradeYearService } from './tbl-shamel-upgrade-year.service';

describe('TblShamelUpgradeYearService', () => {
  let service: TblShamelUpgradeYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblShamelUpgradeYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
