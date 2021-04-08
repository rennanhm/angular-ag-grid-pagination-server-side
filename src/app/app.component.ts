import {Component, OnInit, ViewChild} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {GridOptions, IGetRowsParams} from 'ag-grid-community';
import {Subscription} from 'rxjs';
import {FakeServiceService} from './services/fake-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('myGrid') myGrid: AgGridAngular;

  private gridApi;
  private gridColumnApi;

  gridOptions: Partial<GridOptions>;
  columnDefs;

  userSubscriber: Subscription;

  rowData: any[];
  cacheOverflowSize: any;
  maxConcurrentDatasourceRequests: any;
  infiniteInitialRowCount: any;

  constructor(private userService: FakeServiceService) {
    this.columnDefs = [
      {headerName: 'User Id', field: 'id', sortable: true},
      {headerName: 'First Name', field: 'first_name', sortable: true, filter: 'agTextColumnFilter'},
      {headerName: 'Last Name', field: 'last_name', sortable: true},
      {headerName: 'Email', field: 'email', sortable: true},
      {headerName: 'Gender', field: 'gender', sortable: true},
      {headerName: 'Company id', field: 'company', sortable: true},
    ];

    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 2;
    this.infiniteInitialRowCount = 2;

    this.gridOptions = {
      headerHeight: 45,
      rowHeight: 30,
      cacheBlockSize: 90,
      paginationPageSize: 90,
      rowModelType: 'infinite'
    };
  }


  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onGridReady(params: any) {
    console.log('OnGridReady');

    this.gridApi = params.api;
    this.gridColumnApi = params.gridColumnApi;

    const datasource = {
      // tslint:disable-next-line:no-shadowed-variable
      getRows: (params: IGetRowsParams) => {
        console.log(params);
        this.userService.getUsers(params).subscribe(
          (data: any) => {
            params.successCallback(data.users, data.totalRecords);
          }
        );
      }
    };

    this.gridApi.setDatasource(datasource);
  }

  // tslint:disable-next-line:typedef
  onPaginationChanged($event: any) {
    console.log('onPaginationChanged');
  }
}
