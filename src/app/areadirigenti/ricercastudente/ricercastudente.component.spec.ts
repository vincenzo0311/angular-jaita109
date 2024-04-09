import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicercastudenteComponent } from './ricercastudente.component';

describe('RicercastudenteComponent', () => {
  let component: RicercastudenteComponent;
  let fixture: ComponentFixture<RicercastudenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RicercastudenteComponent]
    });
    fixture = TestBed.createComponent(RicercastudenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
