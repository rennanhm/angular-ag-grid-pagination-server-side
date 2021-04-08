import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AgGridModule} from 'ag-grid-angular';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FakeBackendInterceptors} from './http-interceptor/fake-backend.interceptors';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    HttpClientModule,
    {provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptors, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
