import { DatePipe } from '@angular/common';
import { Competition } from 'src/app/classes/competition';
import { CompetitionService } from './../../../services/competition.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/classes/Myerror-state-matcher';
import { ThemePalette } from '@angular/material/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-competition',
  templateUrl: './add-competition.component.html',
  styleUrls: ['./add-competition.component.scss']
})
export class AddCompetitionComponent implements OnInit {
  pipe = new DatePipe('en-US');

  @ViewChild('picker') picker: any;

  competitionForm!: FormGroup;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();


  constructor(private router: Router, private service: CompetitionService, private formBuilder: FormBuilder) {
    this.reactiveForm();
  }

  ngOnInit(): void {
  }
  reactiveForm(): void {
    this.competitionForm = this.formBuilder.group({ // construct a new instance of FormGroup
      name: ['', Validators.required],
      country: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate:  [new Date()]
  });
  }
  onSubmit(): void {
    const body = this.competitionForm.value;
    body.startDate   = this.pipe.transform(body.startDate, 'yyyy-MM-dd HH:mm');
    this.isLoadingResults = true;
    this.service.addCompetition(body)
      .subscribe((res: Competition) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/competition-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
  onReset(): void {
    this.competitionForm.reset();
}

}



