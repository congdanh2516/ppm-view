import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBoxUpdateComponent } from './notification-box-update.component';

describe('NotificationBoxUpdateComponent', () => {
  let component: NotificationBoxUpdateComponent;
  let fixture: ComponentFixture<NotificationBoxUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationBoxUpdateComponent]
    });
    fixture = TestBed.createComponent(NotificationBoxUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
