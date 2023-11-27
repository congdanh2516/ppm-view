import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBoxCreateSubtaskComponent } from './notification-box-create-subtask.component';

describe('NotificationBoxCreateSubtaskComponent', () => {
  let component: NotificationBoxCreateSubtaskComponent;
  let fixture: ComponentFixture<NotificationBoxCreateSubtaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationBoxCreateSubtaskComponent]
    });
    fixture = TestBed.createComponent(NotificationBoxCreateSubtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
