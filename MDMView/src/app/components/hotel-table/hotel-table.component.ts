import { Data } from './../model/hotel.model';
  import {Component, ViewChild} from '@angular/core';
  import {MatPaginator, MatSort, MatTableDataSource,MatPaginatorModule,MatFormFieldModule,
          MatTableModule,
         } from '@angular/material';
  import { HotelService } from '../../services/hotel.service';
  /**
   * @title Data table with sorting, pagination, and filtering.
   */
  @Component({
    selector: 'table-overview-example',
    styleUrls: ['./hotel-table.component.css'],
    templateUrl: './hotel-table.component.html'
  })
  export class HotelTableComponent {
    displayedColumns = ['id', 'name'];
    dataSource: MatTableDataSource<Data>;
  
    public hotelData : Data[] = []; 
    public errorMsg;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    constructor(private hotelService : HotelService) {
      // Create 100 users
      //const users: UserData[] = [];
     //for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }
  
      // Assign the data to the data source for the table to render
      //this.dataSource = new MatTableDataSource(users);
    }
  
    ngOnInit() {
      this.hotelService.getNullHotel(0,100).subscribe(data => {this.dataSource = new MatTableDataSource(data.data)//this.hotelData = data
                                                      ,console.log(data)},
                                                      error => this.errorMsg = error );
      
     //this.data=this.hotelData.data
     console.log('got data'+this.hotelData)
     //this.dataSource = new MatTableDataSource(this.hotelData);
     //console.log(this.hotelData)
 }

    /**
     * Set the paginator and sort after the view init since this component will
     * be able to query its view for the initialized paginator and sort.
     */
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  }
  








  /** Builds and returns a new User. 
  function createNewUser(id: number): UserData {
    const name =
        NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
  
    return {
      id: id.toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    };
  }
  
  /** Constants used to fill up our data base. 
  const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
    'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
  const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
    'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
    'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];
  
  export interface UserData {
    id: string;
    name: string;
    progress: string;
    color: string;
  }
  
  
  /**  Copyright 2018 Google Inc. All Rights Reserved.
      Use of this source code is governed by an MIT-style license that
      can be found in the LICENSE file at http://angular.io/license */