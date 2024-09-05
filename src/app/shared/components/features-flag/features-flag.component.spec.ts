import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesFlagComponent } from './features-flag.component';

describe('FeaturesFlagComponent', () => {
  let component: FeaturesFlagComponent;
  let fixture: ComponentFixture<FeaturesFlagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesFlagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturesFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
