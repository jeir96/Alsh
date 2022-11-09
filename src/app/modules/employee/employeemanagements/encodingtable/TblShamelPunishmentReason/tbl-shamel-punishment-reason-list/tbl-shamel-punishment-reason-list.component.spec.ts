import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelPunishmentReasonListComponent } from './tbl-shamel-punishment-reason-list.component';

describe('TblShamelPunishmentReasonListComponent', () => {
  let component: TblShamelPunishmentReasonListComponent;
  let fixture: ComponentFixture<TblShamelPunishmentReasonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelPunishmentReasonListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelPunishmentReasonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
