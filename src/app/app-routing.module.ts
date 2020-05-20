import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout.module';


const routes: Routes = [
  { path: 'layout', loadChildren: () => LayoutModule },
  { path: '', redirectTo:'layout', pathMatch:'prefix'},
  { path: '**', redirectTo:'layout', pathMatch:'prefix'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
