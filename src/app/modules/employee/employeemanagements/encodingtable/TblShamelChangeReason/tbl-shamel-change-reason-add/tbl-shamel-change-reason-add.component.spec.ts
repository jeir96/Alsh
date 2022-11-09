import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelChangeReasonAddComponent } from './tbl-shamel-change-reason-add.component';

describe('TblShamelChangeReasonAddComponent', () => {
  let component: TblShamelChangeReasonAddComponent;
  let fixture: ComponentFixture<TblShamelChangeReasonAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelChangeReasonAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelChangeReasonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
