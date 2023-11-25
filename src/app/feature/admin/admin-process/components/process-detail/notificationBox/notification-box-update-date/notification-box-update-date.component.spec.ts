import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBoxUpdateDateComponent } from './notification-box-update-date.component';

describe('NotificationBoxUpdateDateComponent', () => {
  let component: NotificationBoxUpdateDateComponent;
  let fixture: ComponentFixture<NotificationBoxUpdateDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationBoxUpdateDateComponent]
    });
    fixture = TestBed.createComponent(NotificationBoxUpdateDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
