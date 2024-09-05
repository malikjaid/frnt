import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryDialogeComponent } from './summary-dialoge.component';

describe('SummaryDialogeComponent', () => {
  let component: SummaryDialogeComponent;
  let fixture: ComponentFixture<SummaryDialogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryDialogeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummaryDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
