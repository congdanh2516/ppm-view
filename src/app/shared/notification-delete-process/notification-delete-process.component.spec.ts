import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDeleteProcessComponent } from './notification-delete-process.component';

describe('NotificationDeleteProcessComponent', () => {
  let component: NotificationDeleteProcessComponent;
  let fixture: ComponentFixture<NotificationDeleteProcessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationDeleteProcessComponent]
    });
    fixture = TestBed.createComponent(NotificationDeleteProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
