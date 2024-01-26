import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursStudentsTableComponent } from './cours-students-table.component';

describe('CoursStudentsTableComponent', () => {
  let component: CoursStudentsTableComponent;
  let fixture: ComponentFixture<CoursStudentsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursStudentsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursStudentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
