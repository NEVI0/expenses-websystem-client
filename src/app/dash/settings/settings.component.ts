import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    darkMode: boolean = false;

	constructor() {}

	ngOnInit() {}

	onChangeTheme() {
		if (document.body.classList.contains("lightMode")) {
			this.darkMode = true;
			document.body.classList.remove("lightMode");
			document.body.classList.add("darkMode");
		} else {
			this.darkMode = false;
			document.body.classList.remove("darkMode");
			document.body.classList.add("lightMode");
		}
	}

}
