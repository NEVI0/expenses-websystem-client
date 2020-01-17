import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    ngOnInit() {
        const storage = localStorage.getItem("_aplication_theme");

        if (storage == "lightMode") {
            document.body.classList.remove("darkMode");
            document.body.classList.add(storage);
        } else if (storage == "darkMode") {
            document.body.classList.remove("lightMode");
            document.body.classList.add(storage);
        } else if (storage !== "lightMode" && storage !== "darkMode") {
            document.body.classList.remove("darkMode");
            document.body.classList.add("lightMode");
        }
    }

}
