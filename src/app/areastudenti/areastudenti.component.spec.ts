import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreastudentiComponent } from './areastudenti.component';

describe('AreastudentiComponent', () => {
  let component: AreastudentiComponent;
  let fixture: ComponentFixture<AreastudentiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreastudentiComponent]
    });
    fixture = TestBed.createComponent(AreastudentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
