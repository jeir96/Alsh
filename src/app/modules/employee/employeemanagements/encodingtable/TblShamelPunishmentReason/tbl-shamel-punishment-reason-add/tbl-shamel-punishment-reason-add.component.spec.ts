import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelPunishmentReasonAddComponent } from './tbl-shamel-punishment-reason-add.component';

describe('TblShamelPunishmentReasonAddComponent', () => {
  let component: TblShamelPunishmentReasonAddComponent;
  let fixture: ComponentFixture<TblShamelPunishmentReasonAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelPunishmentReasonAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelPunishmentReasonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
