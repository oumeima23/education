import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEvaluationComponent } from './update-evaluation.component';

describe('UpdateEvaluationComponent', () => {
  let component: UpdateEvaluationComponent;
  let fixture: ComponentFixture<UpdateEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
