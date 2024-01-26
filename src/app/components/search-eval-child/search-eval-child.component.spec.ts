import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEvalChildComponent } from './search-eval-child.component';

describe('SearchEvalChildComponent', () => {
  let component: SearchEvalChildComponent;
  let fixture: ComponentFixture<SearchEvalChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEvalChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEvalChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
