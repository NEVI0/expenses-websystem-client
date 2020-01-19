import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {

	private readonly AppTheme = environment.AppTheme;

	darkMode: boolean;

	constructor() {}

	ngOnInit() {
		if (document.body.classList.contains("lightMode")) {
			this.darkMode = false;
		} else {
			this.darkMode = true;
		}
	}

	onChangeTheme() {
		if (document.body.classList.contains("lightMode")) {
			localStorage.setItem(this.AppTheme, "darkMode");
			this.darkMode = true;
			document.body.classList.remove("lightMode");
			document.body.classList.add("darkMode");
		} else {
			localStorage.setItem(this.AppTheme, "lightMode");
			this.darkMode = false;
			document.body.classList.remove("darkMode");
			document.body.classList.add("lightMode");
		}
	}

}
