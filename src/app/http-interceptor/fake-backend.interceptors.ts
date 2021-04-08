import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';

// @ts-ignore
import users from '../mock/MOCK_DATA.json';
import {mergeMap} from 'rxjs/operators';

import * as _ from 'underscore';

@Injectable()
export class FakeBackendInterceptors implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(mergeMap(() => {
      console.log('Fake Backend Intercepted');

      let sortedUsers = users;
      let sortModel = null;
      let sortColId = '';
      let sort = '';
      let filterModel;

      if (!(httpRequest.url === 'http//users')) {
        return next.handle(httpRequest);
      }

      sortModel = httpRequest.body.sortModel;
      filterModel = httpRequest.body.filterModel;

      if (sortModel.length) {
        sortModel.forEach(element => {
          sortColId = element.colId;
          sort = element.sort;
        });

        sortedUsers = (sort === 'asc') ? _.sortBy(users, sortColId) : _.sortBy(users, sortColId).reverse();
      }
      const resBody = {
        users: sortedUsers.slice(httpRequest.body.startRow, httpRequest.body.endRow),
        totalRecords: users.length
      };

      return of(new HttpResponse({status: 200, body: resBody}));
    }));
  }
}
