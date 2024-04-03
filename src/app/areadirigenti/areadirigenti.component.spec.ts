import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreadirigentiComponent } from './areadirigenti.component';

describe('AreadirigentiComponent', () => {
  let component: AreadirigentiComponent;
  let fixture: ComponentFixture<AreadirigentiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreadirigentiComponent]
    });
    fixture = TestBed.createComponent(AreadirigentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
