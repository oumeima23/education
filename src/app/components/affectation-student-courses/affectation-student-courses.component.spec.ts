import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationStudentCoursesComponent } from './affectation-student-courses.component';

describe('AffectationStudentCoursesComponent', () => {
  let component: AffectationStudentCoursesComponent;
  let fixture: ComponentFixture<AffectationStudentCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectationStudentCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationStudentCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
