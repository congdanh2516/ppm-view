import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBoxDeleteComponent } from './notification-box-delete.component';

describe('NotificationBoxDeleteComponent', () => {
  let component: NotificationBoxDeleteComponent;
  let fixture: ComponentFixture<NotificationBoxDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationBoxDeleteComponent]
    });
    fixture = TestBed.createComponent(NotificationBoxDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
