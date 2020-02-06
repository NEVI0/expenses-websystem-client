import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../interfaces/User';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {

    private readonly AppUserData = environment.AppUserData;

    isOpened: boolean = false;
    userData: User = this.authService.user;

    constructor(
        private router: Router,
        private authService: AuthService,
    ) {}

    ngOnInit() {}

    onLogout() {
        localStorage.removeItem("_application_user_data");
        this.router.navigate(['/auth']);
    }

}
