import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'table-view',
    loadComponent: () =>
      import('./home/feature/home.component').then((c) => c.HomeComponent),
  },
  {
    path: '',
    redirectTo: 'table-view',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./home/feature/home.component').then((c) => c.HomeComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
