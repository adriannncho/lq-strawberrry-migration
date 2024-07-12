import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './core/layout/components/base/base.component';
import { AuthPublicGuard } from './core/authentication/guards/auth-public.guard';
import { AuthGuard } from './core/authentication/guards/auth.guard';

const routes: Routes = [
  {
    path: 'signin',
    loadChildren: () => import('./modules/public/signin/signin.module').then((m) => m.SigninModule),
    data: { preload: true },
    canActivate : [AuthPublicGuard]
  },
  {
    path: '',
    component: BaseComponent,
    children: [

    ],
    canActivate : [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
