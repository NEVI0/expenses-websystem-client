import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    private readonly AppUserData = environment.AppUserData;
    private readonly AppTheme = environment.AppTheme;

    constructor(private router: Router) {}

    ngOnInit() {
        const theme = localStorage.getItem(this.AppTheme);
        const json = JSON.parse(localStorage.getItem(this.AppUserData));

        if (theme == "lightMode") {
            document.body.classList.remove("darkMode");
            document.body.classList.add(theme);
        } else if (theme == "darkMode") {
            document.body.classList.remove("lightMode");
            document.body.classList.add(theme);
        } else if (theme !== "lightMode" && theme !== "darkMode") {
            document.body.classList.remove("darkMode");
            document.body.classList.add("lightMode");
        }

        if (json !== undefined || json !== null || json.token !== undefined || json.token !== null || json.token !== '') {
            this.router.navigate(['/dash']);
        }
    }

}
