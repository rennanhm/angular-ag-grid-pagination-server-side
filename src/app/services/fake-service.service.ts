import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeServiceService {

  constructor(private http: HttpClient) {
  }

  getUsers(params): Observable<any> {
    return this.http.post('http//users', params);
  }
}
