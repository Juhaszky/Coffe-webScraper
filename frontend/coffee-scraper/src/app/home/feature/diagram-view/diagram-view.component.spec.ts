import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramViewComponent } from './diagram-view.component';

describe('DiagramViewComponent', () => {
  let component: DiagramViewComponent;
  let fixture: ComponentFixture<DiagramViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DiagramViewComponent]
    });
    fixture = TestBed.createComponent(DiagramViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
