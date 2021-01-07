import { Competition } from './../../../classes/competition';
import { CompetitionService } from './../../../services/competition.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-competition',
  templateUrl: './list-competition.component.html',
  styleUrls: ['./list-competition.component.scss']
})
export class ListCompetitionComponent implements OnInit {
displayedColumns: string[] = ['id', 'name', 'country', 'startDate', 'endDate'];
data: Competition[] = [];
isLoadingResults = true;
  constructor(private service: CompetitionService) { }

  ngOnInit(): void {
    this.service.getCompetitions()
    .subscribe((res: any) => {
    this.data = res;
    console.log(this.data);
    this.isLoadingResults = false;
    }, err => {
    console.log(err);
    this.isLoadingResults = false;
    });
  }

}
