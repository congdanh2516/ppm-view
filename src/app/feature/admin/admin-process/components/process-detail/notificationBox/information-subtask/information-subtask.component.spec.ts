import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationSubtaskComponent } from './information-subtask.component';

describe('InformationSubtaskComponent', () => {
  let component: InformationSubtaskComponent;
  let fixture: ComponentFixture<InformationSubtaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationSubtaskComponent]
    });
    fixture = TestBed.createComponent(InformationSubtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
