import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';


const routes: Routes = [
  { path: 'layout', loadChildren: () => LayoutModule },
  { path: 'commingsoon', component: ComingSoonComponent},
  { path: '', redirectTo:'commingsoon', pathMatch:'prefix'},
  { path: '**', redirectTo:'commingsoon', pathMatch:'prefix'},
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
