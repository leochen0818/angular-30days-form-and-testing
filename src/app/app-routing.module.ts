import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'template-driven-forms-login',
    loadChildren: () => import('./template-driven-forms-login/template-driven-forms-login.module').then(m => m.TemplateDrivenFormsLoginModule)
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
