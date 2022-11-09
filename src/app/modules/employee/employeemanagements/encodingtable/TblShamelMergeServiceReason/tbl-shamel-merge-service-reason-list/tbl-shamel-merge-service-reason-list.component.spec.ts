import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelMergeServiceReasonListComponent } from './tbl-shamel-merge-service-reason-list.component';

describe('TblShamelMergeServiceReasonListComponent', () => {
  let component: TblShamelMergeServiceReasonListComponent;
  let fixture: ComponentFixture<TblShamelMergeServiceReasonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelMergeServiceReasonListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelMergeServiceReasonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
