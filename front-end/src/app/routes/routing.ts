import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { AdminComponent } from '../components/admin/admin.component';
import { ListComponent } from '../components/list/list.component';
import { NuevaFotografiaComponent } from '../components/nueva-fotografia/nueva-fotografia.component';
import { EditarFotografiaComponent } from '../components/editar-fotografia/editar-fotografia.component';

import { GuardService} from '../services/guard.service';

const app_routes: Routes=[
	{path: 'home/:num', component: HomeComponent},
	{path: 'admin', component: AdminComponent, canActivate:[GuardService], 
		children:[
			{path: 'list', component: ListComponent},
			{path: 'new', component: NuevaFotografiaComponent},
			// {path: 'new/:id', component: NuevaFotografiaComponent}, // Variante para utilizar el mismo componente
			{path: 'edit/:id', component: EditarFotografiaComponent}
		]
	},
	{path: 'login', component: LoginComponent},
	{path: '**', pathMatch: 'full', redirectTo: ''}
]

export const AppRouting = RouterModule.forRoot(app_routes);