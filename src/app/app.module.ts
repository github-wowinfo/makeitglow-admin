import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
import { MatTabsModule } from '@angular/material/tabs';
import { QueryTableComponent } from './queries/query-table/query-table.component';
import { CustomerTableComponent } from './customers/customer-table/customer-table.component';
import { UploadTableComponent } from './uploads/upload-table/upload-table.component';
import { BrandModalComponent } from './master/brand-modal/brand-modal.component';
import { BrandTableComponent } from './master/brand-table/brand-table.component';
import { RefernceModalComponent } from './master/refernce-modal/refernce-modal.component';
import { RefernceTableComponent } from './master/refernce-table/refernce-table.component';
import { HexcolorModalComponent } from './master/hexcolor-modal/hexcolor-modal.component';
import { HexcolorTableComponent } from './master/hexcolor-table/hexcolor-table.component';
import { CategoryModalComponent } from './master/category-modal/category-modal.component';
import { CategoryTableComponent } from './master/category-table/category-table.component';
import { SubcategoryModalComponent } from './master/subcategory-modal/subcategory-modal.component';
import { SliderModalComponent } from './master/slider-modal/slider-modal.component';
import { SubcategoryTableComponent } from './master/subcategory-table/subcategory-table.component';
import { SliderTableComponent } from './master/slider-table/slider-table.component';
import { ProductTableComponent } from './products/product-table/product-table.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TopCategoryModalComponent } from './sequence/top-category-modal/top-category-modal.component';
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
    QueryTableComponent,
    CustomerTableComponent,
    UploadTableComponent,
    BrandModalComponent,
    BrandTableComponent,
    RefernceModalComponent,
    RefernceTableComponent,
    HexcolorModalComponent,
    HexcolorTableComponent,
    CategoryModalComponent,
    CategoryTableComponent,
    SubcategoryModalComponent,
    SliderModalComponent,
    SubcategoryTableComponent,
    SliderTableComponent,
    ProductTableComponent,
    TopCategoryModalComponent,
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
    MatTabsModule,
    HttpClientModule,
    MatSelectModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
