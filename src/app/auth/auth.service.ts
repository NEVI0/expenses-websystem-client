import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take, tap } from 'rxjs/operators'

import { environment } from '../../environments/environment';
import { User } from '../interfaces/User';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private readonly OpenedApiUrl = environment.OpenApiUrl;
    private readonly AppUserData = environment.AppUserData;

    private _user = JSON.parse(localStorage.getItem(this.AppUserData));

    constructor(
        private http: HttpClient
    ) {}

    get user() {
        return this._user;
    }

    isAuthenticate() {
        return this._user;
    }

    login(json) {
        return this.http.post<User>(`${this.OpenedApiUrl}/login`, json).pipe(
            tap(resp => this._user = resp)
        );
    }

    signup(json) {
        return this.http.post<User>(`${this.OpenedApiUrl}/signup`, json).pipe(
            tap(resp => this._user = resp)
        );
    }

	validateToken(token: string) {
		return this.http.post<any>(`${this.OpenedApiUrl}/validateToken/`, { token: token }).pipe(take(1));
	}


}
