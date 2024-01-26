import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeSchoolComponent } from './welcome-school.component';

describe('WelcomeSchoolComponent', () => {
  let component: WelcomeSchoolComponent;
  let fixture: ComponentFixture<WelcomeSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
