/* Angular */
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

/* Components */
import { DashComponent } from './dash/dash.component';
import { AuthComponent } from './auth/auth.component';
import { HomePageComponent } from './dash/home-page/home-page.component';
import { AllExpensesComponent } from './dash/all-expenses/all-expenses.component';
import { AccountComponent } from './dash/account/account.component';
import { SettingsComponent } from './dash/settings/settings.component';

/* Guard */
import { AuthGuard } from './guards/auth.guard';

const AppRoutes: Routes = [
    {
        path: 'dash', canActivate: [AuthGuard], component: DashComponent, children: [
            { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
            { path: 'all-expenses', component: AllExpensesComponent, canActivate: [AuthGuard] },
            { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
            { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] }
        ]
    },
    {
        path: 'auth', component: AuthComponent
    },
    {
        path: '', redirectTo: 'auth', pathMatch: 'full'
    }
];

export const RoutesModule: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
