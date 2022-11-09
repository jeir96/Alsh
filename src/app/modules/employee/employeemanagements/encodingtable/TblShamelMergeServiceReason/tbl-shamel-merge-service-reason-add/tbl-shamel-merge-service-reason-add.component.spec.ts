import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelMergeServiceReasonAddComponent } from './tbl-shamel-merge-service-reason-add.component';

describe('TblShamelMergeServiceReasonAddComponent', () => {
  let component: TblShamelMergeServiceReasonAddComponent;
  let fixture: ComponentFixture<TblShamelMergeServiceReasonAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelMergeServiceReasonAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelMergeServiceReasonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
