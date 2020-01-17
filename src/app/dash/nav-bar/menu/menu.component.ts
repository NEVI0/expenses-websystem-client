import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    constructor(private sidenav: MatSidenav) { }

	ngOnInit() {}

	onClose() {
		this.sidenav.close();
	}

}
