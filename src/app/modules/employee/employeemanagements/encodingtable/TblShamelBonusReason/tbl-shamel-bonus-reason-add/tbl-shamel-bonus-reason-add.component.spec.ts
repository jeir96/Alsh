import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelBonusReasonAddComponent } from './tbl-shamel-bonus-reason-add.component';

describe('TblShamelBonusReasonAddComponent', () => {
  let component: TblShamelBonusReasonAddComponent;
  let fixture: ComponentFixture<TblShamelBonusReasonAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelBonusReasonAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelBonusReasonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
