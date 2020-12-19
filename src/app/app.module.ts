import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ListCompetitionComponent } from './components/competitions/list-competition/list-competition.component';
import { AddCompetitionComponent } from './components/competitions/add-competition/add-competition.component';
import { EditCompetitionComponent } from './components/competitions/edit-competition/edit-competition.component';
import { CompetitionDetailsComponent } from './components/competitions/competition-details/competition-details.component';
import { CompetitionStatisticsComponent } from './components/competitions/competition-statistics/competition-statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    ListCompetitionComponent,
    AddCompetitionComponent,
    EditCompetitionComponent,
    CompetitionDetailsComponent,
    CompetitionStatisticsComponent,
  ],
  imports: [
    BrowserModule,
FormsModule,
ReactiveFormsModule,
HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
