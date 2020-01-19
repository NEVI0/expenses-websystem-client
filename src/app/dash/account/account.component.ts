import { Component, OnInit } from '@angular/core';
import { Observable, Subject, empty } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { DataController } from '../../interfaces/DataController';
import { DashService } from '../dash.service';
import { User } from '../../interfaces/User';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {

    dataCtrl$: Observable<DataController>;
	error$ = new Subject<boolean>();

	userData: User = this.authService.user;

	numberOfExpenses: number;
	isLoading: boolean = false;

	constructor(
		private dashService: DashService,
		private authService: AuthService
	) {}

	ngOnInit() {
		this.onRefresh();
	}

	onRefresh() {
		this.isLoading = true;
		this.dataCtrl$ = this.dashService.getUserController().pipe(
			tap(resp => {
				this.isLoading = false;
			}),
			catchError(err => {
				this.error$.next(err);
				return empty();
			})
		);
	}

}
