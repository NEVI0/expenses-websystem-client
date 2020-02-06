import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-dash',
    templateUrl: './dash.component.html',
    styleUrls: ['./dash.component.scss']
})

export class DashComponent implements OnInit {

    private readonly AppUserData = environment.AppUserData;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.authService.validateToken(this.authService.user.token).subscribe(
            resp => {
                if (resp.valid == false) {
                    localStorage.removeItem(this.AppUserData);
                    this.router.navigate(['/auth']);
                } else {
                    console.log("Executando...");
                }
            },
            err => {
                localStorage.removeItem(this.AppUserData);
                this.router.navigate(['/auth']);
            }
        );
    }

}
