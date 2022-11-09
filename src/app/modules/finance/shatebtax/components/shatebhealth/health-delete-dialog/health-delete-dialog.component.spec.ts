import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthDeleteDialogComponent } from './health-delete-dialog.component';

describe('HealthDeleteDialogComponent', () => {
  let component: HealthDeleteDialogComponent;
  let fixture: ComponentFixture<HealthDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthDeleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
