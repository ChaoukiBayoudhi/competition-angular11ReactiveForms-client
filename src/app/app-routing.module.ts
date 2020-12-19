import { CompetitionStatisticsComponent } from './components/competitions/competition-statistics/competition-statistics.component';
import { CompetitionDetailsComponent } from './components/competitions/competition-details/competition-details.component';
import { ListCompetitionComponent } from './components/competitions/list-competition/list-competition.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCompetitionComponent } from './components/competitions/add-competition/add-competition.component';
import { EditCompetitionComponent } from './components/competitions/edit-competition/edit-competition.component';

const routes: Routes = [
{path: 'competitions', component: ListCompetitionComponent, data: {title: 'List of Competition'}},
{path: 'competition-details/:id', component: CompetitionDetailsComponent,  data: {title: 'Details of a competition'}},
{path: 'competition-statistics', component: CompetitionStatisticsComponent,  data: {title: 'Statistics about competitions'}},
{path: 'add-competition', component: AddCompetitionComponent,  data: {title: 'Add a new competition'}},
{path: 'edit-competition/:id', component: EditCompetitionComponent,  data: {title: 'Update an existing competition'}},
{path: '', redirectTo: '/competitions', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
