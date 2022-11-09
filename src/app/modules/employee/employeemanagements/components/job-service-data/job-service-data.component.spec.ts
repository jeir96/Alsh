import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobServiceDataComponent } from './job-service-data.component';

describe('JobServiceDataComponent', () => {
  let component: JobServiceDataComponent;
  let fixture: ComponentFixture<JobServiceDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobServiceDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobServiceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
