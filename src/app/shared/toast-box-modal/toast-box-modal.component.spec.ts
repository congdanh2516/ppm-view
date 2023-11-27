import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastBoxModalComponent } from './toast-box-modal.component';

describe('ToastBoxModalComponent', () => {
  let component: ToastBoxModalComponent;
  let fixture: ComponentFixture<ToastBoxModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastBoxModalComponent]
    });
    fixture = TestBed.createComponent(ToastBoxModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
