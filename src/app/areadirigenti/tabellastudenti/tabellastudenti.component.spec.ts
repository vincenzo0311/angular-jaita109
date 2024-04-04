import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellastudentiComponent } from './tabellastudenti.component';

describe('TabellastudentiComponent', () => {
  let component: TabellastudentiComponent;
  let fixture: ComponentFixture<TabellastudentiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabellastudentiComponent]
    });
    fixture = TestBed.createComponent(TabellastudentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
