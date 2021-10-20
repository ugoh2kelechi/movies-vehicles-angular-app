import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsComponent } from './films/films/films.component';
import { VehiclesComponent } from './vehicles/vehicles/vehicles.component'

const routes: Routes = [
  { path: '',  redirectTo: '/films', pathMatch: 'full' },
  { path: 'films', pathMatch: 'full', component: FilmsComponent},
  { path: 'vehicles', pathMatch: 'full', component: VehiclesComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
