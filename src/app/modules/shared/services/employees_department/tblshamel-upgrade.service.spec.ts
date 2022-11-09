import { TestBed } from '@angular/core/testing';

import { TBLShamelUpgradeService } from './tblshamel-upgrade.service';

describe('TBLShamelUpgradeService', () => {
  let service: TBLShamelUpgradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TBLShamelUpgradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
