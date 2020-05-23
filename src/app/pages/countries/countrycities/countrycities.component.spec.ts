import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrycitiesComponent } from './countrycities.component';

describe('CountrycitiesComponent', () => {
  let component: CountrycitiesComponent;
  let fixture: ComponentFixture<CountrycitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrycitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrycitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
