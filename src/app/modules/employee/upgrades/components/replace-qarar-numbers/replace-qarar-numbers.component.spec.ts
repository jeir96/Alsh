import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaceQararNumbersComponent } from './replace-qarar-numbers.component';

describe('ReplaceQararNumbersComponent', () => {
  let component: ReplaceQararNumbersComponent;
  let fixture: ComponentFixture<ReplaceQararNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplaceQararNumbersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplaceQararNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
