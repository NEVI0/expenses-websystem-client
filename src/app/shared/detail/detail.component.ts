import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';

import { DashService } from '../../dash/dash.service';
import { Expense } from '../../interfaces/Expense';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnInit {

    expense$: Observable<Expense>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dashService: DashService
    ) {}

    ngOnInit() {
        this.expense$ = this.dashService.getExpenseById(this.data._id);
    }

}
