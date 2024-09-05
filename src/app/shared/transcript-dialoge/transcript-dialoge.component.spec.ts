import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptDialogeComponent } from './transcript-dialoge.component';

describe('TranscriptDialogeComponent', () => {
  let component: TranscriptDialogeComponent;
  let fixture: ComponentFixture<TranscriptDialogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranscriptDialogeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranscriptDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
