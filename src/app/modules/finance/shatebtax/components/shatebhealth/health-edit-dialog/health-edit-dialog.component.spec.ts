import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthEditDialogComponent } from './health-edit-dialog.component';

describe('HealthEditDialogComponent', () => {
  let component: HealthEditDialogComponent;
  let fixture: ComponentFixture<HealthEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
