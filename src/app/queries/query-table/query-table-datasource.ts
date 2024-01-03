import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';



// TODO: Replace this with your own data model type
export interface QueryTableItem {
  SrNo: number;
  Customer: string;
  Company: string;
  ContactInfo: number;
  ZipCode: number;
  Detail: string;
  Action: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: QueryTableItem[] = [
  { SrNo: 1, Customer: 'ABC', Company: 'PQR', ContactInfo: 200, ZipCode: 241308, Detail: 'Enquiry', Action: '' },
];

/**
 * Data source for the QueryTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class QueryTableDataSource extends DataSource<QueryTableItem> {
  data: QueryTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<QueryTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: QueryTableItem[]): QueryTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: QueryTableItem[]): QueryTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {


        case 'SrNo': return compare(a.SrNo, b.SrNo, isAsc);
        case 'Customer': return compare(+a.Customer, +b.Customer, isAsc);
        case 'Company': return compare(+a.Company, +b.Company, isAsc);
        case 'ContactInfo': return compare(+a.ContactInfo, +b.ContactInfo, isAsc);
        case 'ZipCode': return compare(+a.ZipCode, +b.ZipCode, isAsc);
        case 'Detail': return compare(+a.Detail, +b.Detail, isAsc);
        case 'Action': return compare(+a.Action, +b.Action, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
