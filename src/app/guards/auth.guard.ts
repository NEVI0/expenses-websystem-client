import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subscription, Subject } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    private readonly AppUserData = environment.AppUserData;
    public isValid: boolean;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        const json = this.authService.isAuthenticate();

        if (json == undefined || json == null || json.token == undefined || json.token == null || json.token == '') {
            this.router.navigate(['/auth']);
            return false;
        }

        return true;

    }

}
