import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackForm } from './track-form';

describe('TrackForm', () => {
  let component: TrackForm;
  let fixture: ComponentFixture<TrackForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
