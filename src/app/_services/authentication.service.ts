import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {


        console.log(username);
        console.log(password);
        return this.http.post<any>(`${environment.apiUrl}/auth/local`, { "identifier": username, "password": password })
            .pipe(map(response => {
                console.log(response);
                const user = new User();
                user.id = response.user.id;
                user.username = response.user.email;
                user.password = response.user.password;
                user.token = response.jwt
                user.blocked = response.user.blocked;
                console.log(user);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }), 
            catchError(e => throwError(e)));
            
    }

    headers() {
        let httpHeaders: HttpHeaders = new HttpHeaders();
      
        if (localStorage['token']) {
          httpHeaders = httpHeaders.set(
              'Authorization', 'Bearer ' + localStorage['token']
          );
        }
      
      return { headers: httpHeaders };
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}