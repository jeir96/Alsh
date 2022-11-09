import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelBrokerShatebListComponent } from './tbl-shamel-broker-shateb-list.component';

describe('TblShamelBrokerShatebListComponent', () => {
  let component: TblShamelBrokerShatebListComponent;
  let fixture: ComponentFixture<TblShamelBrokerShatebListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelBrokerShatebListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelBrokerShatebListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
