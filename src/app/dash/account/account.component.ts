import { Component, OnInit } from '@angular/core';
import { Observable, Subject, empty } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import { DataController } from '../../interfaces/DataController';
import { DashService } from '../dash.service';
import { User } from '../../interfaces/User';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {

	private readonly AppUserData = environment.AppUserData;

    dataCtrl$: Observable<DataController>;
	error$ = new Subject<boolean>();

	userData: User = this.authService.user;
	isLoading: boolean = false;

	constructor(
		private dashService: DashService,
		private authService: AuthService,
		private dialog: MatDialog
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

	onShowAlert() {
		this.dialog.open(ModalComponent, {
			width: "350px",
			data: {
				msg: "Tem certeza que você quer deletar sua conta? Lembre-se que você não poderá mais recupera-lá.",
				close: "Não",
				action: "Sim, quero deletar!",
				_id: this.userData._id
			}
		});
	}

}
