import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, fromEvent, Observable } from 'rxjs';
import { FullUser } from 'src/app/shared/models/fulluser.model';
import { User, UsersData } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  // Using Environment API URL {apiTestUrl} For Dev. Mode
  // Using Enviromed API URL {ApiUrl} For Prod
  apiTestUrl = environment.api;

// Getting UserList Data
  getUsers(page: number, size: number): Observable<UsersData> {
    return this.http
      .get<UsersData>(`${this.apiTestUrl}user/${page}/${size}`)
  }


}
