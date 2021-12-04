import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {AuthGuardService} from './core/guards/auth-guard.service';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
	},
	{
		path: '404',
		component: PageNotFoundComponent
	},
	{
    path: 'signup',
    loadChildren: () => import('./pages/signup-page/signup-page.module').then(m => m.SignupPageModule)
  },
	{
    path: 'login',
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)
  },
	{
    path: 'overview',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/overview/overview.module').then(m => m.OverviewModule)
  },
	{
		path: '**',
		redirectTo: '404'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
