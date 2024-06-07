import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './core/layout/components/base/base.component';

const routes: Routes = [
  {
    path: 'signin',
    loadChildren: () => import('./modules/public/signin/signin.module').then((m) => m.SigninModule),
    data: { preload: true }
  },
  {
    path: '',
    component: BaseComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
