import { Competition } from 'src/app/classes/competition';
import { Statistic } from './../../../classes/statistic';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-competition-statistics',
  templateUrl: './competition-statistics.component.html',
  styleUrls: ['./competition-statistics.component.scss']
})
export class CompetitionStatisticsComponent implements OnInit {
  tab: Statistic[] = [];
  selectedName = 'competition1';
  isLoadingResults = true;
  isLoadingResults1 = true;

  competitionNames: string[] = [];
  data: Competition[] = [];
  barChartOptions: ChartOptions = {
  responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [{ data: [], backgroundColor: [], label: this.selectedName }];
  constructor(private service: CompetitionService) { }

  ngOnInit(): void {
  this.extractCompetitionNames();
  this.getStatistic(this.selectedName);
  }

  getStatistic(name: string): void {
    this.barChartData = [{ data: [], backgroundColor: [], label: this.selectedName }];
    this.barChartLabels = [];
    this.service.getStatistic(name)
    .subscribe((res: any) => {
      this.tab = res;
      this.isLoadingResults = false;
      console.log(this.tab);
      const chartdata: number[] = [];
      const chartcolor: string[] = [];
      this.tab.forEach((tab) => {
        this.barChartLabels.push(tab.year.toString());
        chartdata.push(tab.count);
        chartcolor.push('rgba(255, 185, 0, 0.7)');
      });
      this.barChartData = [{ data: chartdata, backgroundColor: chartcolor, label: this.selectedName }];
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
  changeStatus(): void {
    this.isLoadingResults = true;
    this.getStatistic(this.selectedName);
  }
  getCompetitions(): void{
  this.service.getCompetitions()
  .subscribe(res => {
  this.data = res;
  this.isLoadingResults1 = false;
  }, err => {
  console.log(err);
  this.isLoadingResults1 = false;
  });
  }
  extractCompetitionNames(): void
  {
  this.getCompetitions();
  for (let i = 0; i < this.data.length; i++){
    this.competitionNames[i] = this.data[i].name;
  }

  }

}
