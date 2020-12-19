import { CompetitionService } from './../../../services/competition.service';
import { Component, OnInit } from '@angular/core';
import { Competition } from 'src/app/classes/competition';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.scss']
})
export class CompetitionDetailsComponent implements OnInit {
  competition: Competition = new Competition();

isLoadingResults = true;
  constructor(private route: ActivatedRoute, private service: CompetitionService, private router: Router) { }

  ngOnInit(): void {
this.getCompetitionDetails(this.route.snapshot.params.id);
  }

  getCompetitionDetails(id: BigInteger): any {
    this.service.getCompetitionById(id)
      .subscribe((data: any) => {
        this.competition = data;
        console.log(this.competition);
        this.isLoadingResults = false;
      });
  }
deleteCompetition(id: BigInteger): void {
this.isLoadingResults = true;
this.service.deleteCompetition(id)
.subscribe( (res: any) => {
this.isLoadingResults = false;
this.router.navigate(['/competitions']);
}, (err: any) => {
console.log(err);
this.isLoadingResults = false;
}
);
}
}
