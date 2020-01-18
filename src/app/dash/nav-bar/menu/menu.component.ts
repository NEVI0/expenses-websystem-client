import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    constructor(
        private sidenav: MatSidenav,
        private router: Router
    ) {}

	ngOnInit() {}

	onClose() {
		this.sidenav.close();
    }

    onLogout() {
        localStorage.removeItem("_application_user_data");
        this.router.navigate(['/auth']);
    }

}
