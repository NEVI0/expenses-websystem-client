import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

/* Components */
import { DashComponent } from './dash/dash.component';
import { AuthComponent } from './auth/auth.component';
import { HomePageComponent } from './dash/home-page/home-page.component';
import { AllExpensesComponent } from './dash/all-expenses/all-expenses.component';
import { AccountComponent } from './dash/account/account.component';
import { SettingsComponent } from './dash/settings/settings.component';

const AppRoutes: Routes = [
    {
        path: 'dash', component: DashComponent, children: [
            { path: '', component: HomePageComponent },
            { path: 'all-expenses', component: AllExpensesComponent },
            { path: 'account', component: AccountComponent },
            { path: 'settings', component: SettingsComponent }
        ]
    },
    {
        path: 'auth', component: AuthComponent
    },
    {
        path: '', redirectTo: 'dash', pathMatch: 'full'
    }
];

export const RoutesModule: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
