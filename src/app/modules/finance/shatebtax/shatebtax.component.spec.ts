import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShatebtaxComponent } from './shatebtax.component';

describe('ShatebtaxComponent', () => {
  let component: ShatebtaxComponent;
  let fixture: ComponentFixture<ShatebtaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShatebtaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShatebtaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
