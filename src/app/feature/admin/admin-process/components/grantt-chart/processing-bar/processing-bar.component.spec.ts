import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingBarComponent } from './processing-bar.component';

describe('ProcessingBarComponent', () => {
  let component: ProcessingBarComponent;
  let fixture: ComponentFixture<ProcessingBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessingBarComponent]
    });
    fixture = TestBed.createComponent(ProcessingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
