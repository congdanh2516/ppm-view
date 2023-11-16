import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModificationComponent } from './task-modification.component';

describe('TaskModificationComponent', () => {
  let component: TaskModificationComponent;
  let fixture: ComponentFixture<TaskModificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskModificationComponent]
    });
    fixture = TestBed.createComponent(TaskModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
