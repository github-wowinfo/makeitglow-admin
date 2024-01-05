import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { HexcolorTableDataSource, HexcolorTableItem } from './hexcolor-table-datasource';

@Component({
  selector: 'app-hexcolor-table',
  templateUrl: './hexcolor-table.component.html',
  styleUrls: ['./hexcolor-table.component.scss']
})
export class HexcolorTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<HexcolorTableItem>;
  dataSource: HexcolorTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'code', 'action'];

  constructor() {
    this.dataSource = new HexcolorTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
