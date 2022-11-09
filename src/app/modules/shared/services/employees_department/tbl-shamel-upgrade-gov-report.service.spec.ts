import { TestBed } from '@angular/core/testing';

import { TblShamelUpgradeGovReportService } from './tbl-shamel-upgrade-gov-report.service';

describe('TblShamelUpgradeGovReportService', () => {
  let service: TblShamelUpgradeGovReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblShamelUpgradeGovReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
