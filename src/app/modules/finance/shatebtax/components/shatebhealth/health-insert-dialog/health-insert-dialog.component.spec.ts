import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInsertDialogComponent } from './health-insert-dialog.component';

describe('HealthInsertDialogComponent', () => {
  let component: HealthInsertDialogComponent;
  let fixture: ComponentFixture<HealthInsertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthInsertDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthInsertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
