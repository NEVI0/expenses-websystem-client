import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {

    isOpened: boolean = false;

    constructor(private router: Router) {}

    ngOnInit() {}

    onLogout() {
        localStorage.removeItem("_application_user_data");
        this.router.navigate(['/auth']);
    }

}
