import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
	},
	{
		path: '404',
		component: PageNotFoundComponent
	},
	{ path: 'signup', loadChildren: () => import('./pages/signup-page/signup-page.module').then(m => m.SignupPageModule) },
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
