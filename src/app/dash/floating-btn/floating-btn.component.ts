import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AddExpenseComponent } from '../../shared/add-expense/add-expense.component';

@Component({
    selector: 'app-floating-btn',
    templateUrl: './floating-btn.component.html',
    styleUrls: ['./floating-btn.component.scss']
})

export class FloatingBtnComponent implements OnInit {

    constructor(private dialog: MatDialog) {}

	ngOnInit() {}

	openDialog() {
		const dialogRef = this.dialog.open(AddExpenseComponent, {
            width: "400px"
        });
        dialogRef.afterClosed().subscribe(resp => {
			console.log(`Dialog Result: ${resp}`);
		});
	}

}
