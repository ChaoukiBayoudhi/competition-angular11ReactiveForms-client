import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/classes/Myerror-state-matcher';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-edit-competition',
  templateUrl: './edit-competition.component.html',
  styleUrls: ['./edit-competition.component.scss']
})
export class EditCompetitionComponent implements OnInit {

  pipe = new DatePipe('en-US');
  competitionForm!: FormGroup;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  id!: BigInteger;

  constructor(private router: Router, private route: ActivatedRoute, private service: CompetitionService, private formBuilder: FormBuilder) {
    this.reactiveForm();
  }

  reactiveForm(): void {
    this.competitionForm = this.formBuilder.group({ // construct a new instance of FormGroup
      name: ['', Validators.required],
      country: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate:  [new Date()]
  });
  }
  ngOnInit(): void {
    this.getCompetitionDetails(this.route.snapshot.params.id);
  }
  getCompetitionDetails(id: BigInteger): void {
    this.service.getCompetitionById(id)
    .subscribe(competition => {
    this.id = competition.id;
    this.competitionForm.setValue({
    name: competition.name,
    country: competition.country,
    startDate: competition.startDate,
    endDate: competition.endDate
    });
    }, (err: any) => {
    console.log(err);
    }
    );
  }
onSubmit(): void {
  this.isLoadingResults = true;
  const body = this.competitionForm.value;
  body.startDate   = this.pipe.transform(body.startDate, 'yyyy-MM-dd HH:mm');
  this.service.updateCompetition(this.id, this.competitionForm.value)
  .subscribe(competition => {
  const id = competition.id;
  this.isLoadingResults = false;
  this.router.navigate(['/competition-details', id]);
  }, (err: any) => {
  console.log(err);
  this.isLoadingResults = false;
  });
}
goToCompetitionDetails(): void{
  this.router.navigate(['/competition-details/', this.id]);
}

}
