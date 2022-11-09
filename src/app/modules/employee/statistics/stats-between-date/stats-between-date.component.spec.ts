import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsBetweenDateComponent } from './stats-between-date.component';

describe('StatsBetweenDateComponent', () => {
  let component: StatsBetweenDateComponent;
  let fixture: ComponentFixture<StatsBetweenDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsBetweenDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsBetweenDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
