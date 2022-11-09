import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobServiceDataAdjustPrintDialogComponent } from './job-service-data-adjust-print-dialog.component';

describe('JobServiceDataAdjustPrintDialogComponent', () => {
  let component: JobServiceDataAdjustPrintDialogComponent;
  let fixture: ComponentFixture<JobServiceDataAdjustPrintDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobServiceDataAdjustPrintDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobServiceDataAdjustPrintDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
