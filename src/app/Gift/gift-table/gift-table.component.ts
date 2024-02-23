import { GiftIncludeModalComponent } from './../gift-include-modal/gift-include-modal.component';
import { DeleteConfirmationComponent } from './../../delete-confirmation/delete-confirmation.component';
import { ToastService } from './../../toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GiftTableDataSource, GiftTableItem } from './gift-table-datasource';

@Component({
  selector: 'app-gift-table',
  templateUrl: './gift-table.component.html',
  styleUrls: ['./gift-table.component.scss']
})
export class GiftTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<GiftTableItem>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  product: any = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */


  displayedColumns = ['ItemEntryId', 'itemName', 'action', 'action1', 'action2'];

  constructor(private router: Router, private apiService: ApiService, private dialog: MatDialog, private toastService: ToastService) {
    this.loadProduct()
  }


  loadProduct() {
    this.apiService.getGifts().subscribe(
      (response) => {
        this.product = response
        this.dataSource = new MatTableDataSource<any>(this.product)
        this.dataSource.paginator = this.paginator;

      },
      (error) => {
        console.error('Error creating post:', error);
        // Optionally, you can handle errors, show a message, etc.
      }
    )
  }
  onSlideToggleChange(id: any, currentVariant: any) {
    const newVariant = !currentVariant; // Flip the value
    this.setVariant(id, newVariant);
  }

  setVariant(id: any, variant: any) {
    this.apiService.EnableDisableHasVariant(id, variant).subscribe(response => {
      this.toastService.showSuccess('Variant Updated successfully!');
      this.loadProduct();
      console.log('variant', response);
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError(error.message)
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }

  deleteGift(id: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed deletion
        this.apiService.deleteGift(id).subscribe(response => {
          this.toastService.showSuccess('Gift Deleted successfully!');
          this.loadProduct();
          console.log('Delete successful', response);
        });
      }
    });
  }
  addIncludes(id: any) {
    var _popup = this.dialog.open(GiftIncludeModalComponent, {
      width: '40%',
      data: {
        id: id
      }
    });

    _popup.afterClosed().subscribe(item => {
      this.loadProduct()
    })
  }

  redirectToViewGift(id: string): void {
    console.log('clicked');
    this.router.navigate(['/viewGift', id]);
  }
  redirectToStock(id: string): void {
    this.router.navigate(['/Inventory', id]);
  }
  navigateToAddOrUpdateGift(productId: string | null) {
    const route = productId ? `addGift/${productId}` : '/addGift';
    this.router.navigate([route]);
  }

  // ngAfterViewInit(): void {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  //   this.table.dataSource = this.dataSource;
  // }
  ngAfterViewInit(): void {
    // Check if the necessary components are defined before accessing their properties
    if (this.sort && this.paginator && this.table) {
      this.dataSource.sort = this.sort;
      this.table.dataSource = this.dataSource;
    } else {
      console.error('One or more required components are undefined.');
    }
  }
}
