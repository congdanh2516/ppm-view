import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBoxMessageComponent } from './notification-box-message.component';

describe('NotificationBoxMessageComponent', () => {
  let component: NotificationBoxMessageComponent;
  let fixture: ComponentFixture<NotificationBoxMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationBoxMessageComponent]
    });
    fixture = TestBed.createComponent(NotificationBoxMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
