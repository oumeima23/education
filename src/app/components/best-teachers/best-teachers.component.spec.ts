import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestTeachersComponent } from './best-teachers.component';

describe('BestTeachersComponent', () => {
  let component: BestTeachersComponent;
  let fixture: ComponentFixture<BestTeachersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestTeachersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
