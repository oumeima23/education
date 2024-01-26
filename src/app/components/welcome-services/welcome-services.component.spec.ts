import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeServicesComponent } from './welcome-services.component';

describe('WelcomeServicesComponent', () => {
  let component: WelcomeServicesComponent;
  let fixture: ComponentFixture<WelcomeServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
