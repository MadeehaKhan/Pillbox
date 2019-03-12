import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TutorialGuard } from './guards/tutorial.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' , canActivate: [TutorialGuard]},
  { path: 'tutorial', loadChildren: './intro/tutorial/tutorial.module#TutorialPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'medication', loadChildren: './medication/medication.module#MedicationPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'medication-modify', loadChildren: './medication-modify/medication-modify.module#MedicationModifyPageModule' },
  { path: 'change-name', loadChildren: './profile/change-name/change-name.module#ChangeNamePageModule' },
  { path: 'change-phone', loadChildren: './profile/change-phone/change-phone.module#ChangePhonePageModule' },
  { path: 'change-email', loadChildren: './profile/change-email/change-email.module#ChangeEmailPageModule' },  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'view-all-medications', loadChildren: './profile/view-all-medications/view-all-medications.module#ViewAllMedicationsPageModule' },
  { path: 'change-healthconditions', loadChildren: './profile/change-healthconditions/change-healthconditions.module#ChangeHealthconditionsPageModule' },
  { path: 'change-physicianinformation', loadChildren: './profile/change-physicianinformation/change-physicianinformation.module#ChangePhysicianinformationPageModule' }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
