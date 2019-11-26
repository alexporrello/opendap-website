import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReleasesPageComponent } from './components/releases-page/releases-page.component';

const routes: Routes = [
  { path: 'releases', component: ReleasesPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
