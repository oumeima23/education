import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackParentsComponent } from './feedback-parents.component';

describe('FeedbackParentsComponent', () => {
  let component: FeedbackParentsComponent;
  let fixture: ComponentFixture<FeedbackParentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackParentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
