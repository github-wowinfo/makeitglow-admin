import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ProductComponent } from './products/product/product.component';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PopupComponent } from './popup/popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MatCardModule } from '@angular/material/card';
import { OrdersComponent } from './orders/orders/orders.component';
import { QueriesComponent } from './queries/queries/queries.component';
import { CustomersComponent } from './customers/customers/customers.component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AddProductVariantComponent } from './products/add-product-variant/add-product-variant.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { UploadsComponent } from './uploads/uploads.component';
import { MasterDataComponent } from './master/master-data/master-data.component';
import { EcommSequenceComponent } from './sequence/ecomm-sequence/ecomm-sequence.component';
import { OrderTableComponent } from './orders/order-table/order-table.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DashboardComponent,
    SidenavComponent,
    ProductComponent,
    DataTableComponent,
    PopupComponent,
    LoginComponent,
    SignupComponent,
    OrdersComponent,
    QueriesComponent,
    CustomersComponent,
    AddProductComponent,
    AddProductVariantComponent,
    ProductListComponent,
    UploadsComponent,
    MasterDataComponent,
    EcommSequenceComponent,
    OrderTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatCardModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
