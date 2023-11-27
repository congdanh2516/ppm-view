import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBoxUpdateSubtaskComponent } from './notification-box-update-subtask.component';

describe('NotificationBoxUpdateSubtaskComponent', () => {
  let component: NotificationBoxUpdateSubtaskComponent;
  let fixture: ComponentFixture<NotificationBoxUpdateSubtaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationBoxUpdateSubtaskComponent]
    });
    fixture = TestBed.createComponent(NotificationBoxUpdateSubtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
