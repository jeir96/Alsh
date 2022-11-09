import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelBonusReasonListComponent } from './tbl-shamel-bonus-reason-list.component';

describe('TblShamelBonusReasonListComponent', () => {
  let component: TblShamelBonusReasonListComponent;
  let fixture: ComponentFixture<TblShamelBonusReasonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelBonusReasonListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelBonusReasonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
