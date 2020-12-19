import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionStatisticsComponent } from './competition-statistics.component';

describe('CompetitionStatisticsComponent', () => {
  let component: CompetitionStatisticsComponent;
  let fixture: ComponentFixture<CompetitionStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
