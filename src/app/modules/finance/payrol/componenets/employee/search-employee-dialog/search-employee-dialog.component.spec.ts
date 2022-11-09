import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEmployeeDialogComponent } from './search-employee-dialog.component';

describe('SearchEmployeeDialogComponent', () => {
  let component: SearchEmployeeDialogComponent;
  let fixture: ComponentFixture<SearchEmployeeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchEmployeeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchEmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
