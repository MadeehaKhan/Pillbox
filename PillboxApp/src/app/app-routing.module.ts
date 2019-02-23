import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TutorialGuard } from './guards/tutorial.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' , canActivate: [TutorialGuard]},
  { path: 'tutorial', loadChildren: './intro/tutorial/tutorial.module#TutorialPageModule' },  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'medication', loadChildren: './medication/medication.module#MedicationPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
