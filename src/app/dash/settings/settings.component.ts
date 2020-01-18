import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {

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
			localStorage.setItem("_application_theme", "darkMode");
			this.darkMode = true;
			document.body.classList.remove("lightMode");
			document.body.classList.add("darkMode");
		} else {
			localStorage.setItem("_application_theme", "lightMode");
			this.darkMode = false;
			document.body.classList.remove("darkMode");
			document.body.classList.add("lightMode");
		}
	}

}
