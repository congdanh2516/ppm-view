import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessCreationComponent } from './process-creation.component';

describe('ProcessCreationComponent', () => {
  let component: ProcessCreationComponent;
  let fixture: ComponentFixture<ProcessCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessCreationComponent]
    });
    fixture = TestBed.createComponent(ProcessCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
