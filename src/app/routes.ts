import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core' 
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { DataBaseService } from './database.service';
import { MeningsPusselComponent } from './menings-pussel/menings-pussel.component';

//https://github.com/angular/angularfire2/issues/282

export const routes: ModuleWithProviders = RouterModule.forRoot([
  { path: 'main', 
    component: MainComponent, 
    canActivate: [DataBaseService]
  },
  { path: 'pussel/:difficulty', 
    component: MeningsPusselComponent, 
    canActivate: [DataBaseService]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'main' }
]);
