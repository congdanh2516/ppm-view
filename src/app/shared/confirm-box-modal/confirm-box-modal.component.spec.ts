import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBoxModalComponent } from './confirm-box-modal.component';

describe('ConfirmBoxModalComponent', () => {
  let component: ConfirmBoxModalComponent;
  let fixture: ComponentFixture<ConfirmBoxModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmBoxModalComponent]
    });
    fixture = TestBed.createComponent(ConfirmBoxModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
