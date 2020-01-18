import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    constructor(private router: Router) {}

    ngOnInit() {
        const theme = localStorage.getItem("_application_theme");
        const json = JSON.parse(localStorage.getItem("_application_user_data"));

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
