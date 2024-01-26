import { TestBed } from '@angular/core/testing';

import { TeacherCourseService } from './teacher-course.service';

describe('TeacherCourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherCourseService = TestBed.get(TeacherCourseService);
    expect(service).toBeTruthy();
  });
});
