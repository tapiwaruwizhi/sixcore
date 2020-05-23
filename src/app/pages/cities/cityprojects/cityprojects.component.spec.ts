import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityprojectsComponent } from './cityprojects.component';

describe('CityprojectsComponent', () => {
  let component: CityprojectsComponent;
  let fixture: ComponentFixture<CityprojectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityprojectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
