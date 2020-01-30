import { Injectable } from '@angular/core';
import { tap, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Expense } from '../interfaces/Expense';
import { DataController } from '../interfaces/DataController';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})

export class DashService {

    private readonly BlockedApiUrl = environment.BlockedApiUrl;
	private readonly UserId = this.authService.user._id;

	constructor(
		private http: HttpClient,
		private authService: AuthService
	) {}

	headers = new HttpHeaders({
		'Authorization': this.authService.user.token
	});

	/* Requisições para as Despesas */
	getExpenses() {
		return this.http.get<Expense[]>(`${this.BlockedApiUrl}/expenses/${this.UserId}`, {
			headers: this.headers
		}).pipe(
			tap(resp => resp)
		);
	}

	getExpenseById(_id: string) {
		return this.http.get<Expense>(`${this.BlockedApiUrl}/expense/${_id}`, {
			headers: this.headers
		}).pipe(take(1));
	}

	getLastTenExpenses() {
		return this.http.get<Expense[]>(`${this.BlockedApiUrl}/lastExpenses/${this.UserId}`, {
			headers: this.headers
		}).pipe(
			tap(resp => resp)
		);
	}

	getUserController() {
		return this.http.get<DataController>(`${this.BlockedApiUrl}/dataController/${this.UserId}`, {
			headers: this.headers
		}).pipe(
			tap(resp => resp)
		);
	}

	search(_id: string, tag: string) {
		return this.http.get<Expense[]>(`${this.BlockedApiUrl}/search/${_id}?tag=${tag}`, {
			headers: this.headers
		}).pipe(
			tap(resp => resp)
		);
	}

	insertExpense(body) {
		return this.http.post(`${this.BlockedApiUrl}/expenses/`, body, {
			headers: this.headers
		}).pipe(take(1));
	}

	updateExpense(data, _id: string) {

	}

	deleteExpense(_id: string) {
		return this.http.delete(`${this.BlockedApiUrl}/expenses/${_id}`, {
			headers: this.headers
		}).pipe(take(1));
	}
	/* FIM */

	/* Requisições para Usuário */
	forgotPass(email: string) {
		return this.http.post<any>(`${this.BlockedApiUrl}/forgotPass`, { email }, {
			headers: this.headers
		}).pipe(take(1));
	}

	resetPass(body) {
		return this.http.post<any>(`${this.BlockedApiUrl}/resetPass`, body, {
			headers: this.headers
		}).pipe(take(1));
	}

	updateUser(_id: string, body) {
		return this.http.put(`${this.BlockedApiUrl}/user/${_id}`, body, {
			headers: this.headers
		}).pipe(take(1));
	}

	deleteUser(_id: string) {
		return this.http.delete(`${this.BlockedApiUrl}/user/${_id}`, {
			headers: this.headers
		}).pipe(take(1));
	}
	/* FIM */

}
