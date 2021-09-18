import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'template-driven-forms-login',
    loadChildren: () => import('./template-driven-forms-login/template-driven-forms-login.module').then(m => m.TemplateDrivenFormsLoginModule)
  },
  {
    path: 'template-driven-forms-async-insured',
    loadChildren: () => import('./template-driven-forms-async-insured/template-driven-forms-async-insured.module').then(m => m.TemplateDrivenFormsAsyncInsuredModule)
  },
  {
    path: 'reactive-forms-login',
    loadChildren: () => import('./reactive-forms-login/reactive-forms-login.module').then(m => m.ReactiveFormsLoginModule)
  },
  {
    path: 'reactive-forms-async-insured',
    loadChildren: () => import('./reactive-forms-async-insured/reactive-forms-async-insured.module').then(m => m.ReactiveFormsAsyncInsuredModule)
  },
  {
    path: '**',
    redirectTo: 'template-driven-forms-login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
