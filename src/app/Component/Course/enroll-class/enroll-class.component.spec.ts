import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollClassComponent } from './enroll-class.component';

describe('EnrollClassComponent', () => {
  let component: EnrollClassComponent;
  let fixture: ComponentFixture<EnrollClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnrollClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
