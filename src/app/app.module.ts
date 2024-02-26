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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { CountryTableComponent } from './Countries/country-table/country-table.component';
import { CountriesTableComponent } from './master/countries-table/countries-table.component';
import { CountriesModalComponent } from './master/countries-modal/countries-modal.component';
import { CityTableComponent } from './master/city-table/city-table.component';
import { CityModalComponent } from './master/city-modal/city-modal.component';
import { LocationTableComponent } from './master/location-table/location-table.component';
import { LocationModalComponent } from './master/location-modal/location-modal.component';
import { FaqTableComponent } from './master/faq-table/faq-table.component';
import { FaqModalComponent } from './master/faq-modal/faq-modal.component';
import { EventTableComponent } from './master/event-table/event-table.component';
import { EventModalComponent } from './master/event-modal/event-modal.component';
import { TaxTableComponent } from './master/tax-table/tax-table.component';
import { TaxModalComponent } from './master/tax-modal/tax-modal.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ViewProductComponent } from './products/view-product/view-product.component';
import { NewOrderTableComponent } from './orders/new-order-table/new-order-table.component';
import { ProcessOrderTableComponent } from './orders/process-order-table/process-order-table.component';
import { ConfirmOrderTableComponent } from './orders/confirm-order-table/confirm-order-table.component';
import { ShippedOrderTableComponent } from './orders/shipped-order-table/shipped-order-table.component';
import { DeliveredOrderTableComponent } from './orders/delivered-order-table/delivered-order-table.component';
import { CanceledOrderTableComponent } from './orders/canceled-order-table/canceled-order-table.component';
import { RefundOrderTableComponent } from './orders/refund-order-table/refund-order-table.component';
import { DeletedOrderTableComponent } from './orders/deleted-order-table/deleted-order-table.component';
import { OrderStatusModalComponent } from './orders/order-status-modal/order-status-modal.component';
import { FormsModule } from '@angular/forms';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { PaymentStatusModalComponent } from './orders/payment-status-modal/payment-status-modal.component';
import { AddVariantComponent } from './products/add-variant/add-variant.component';
import { AddInventoryComponent } from './products/add-inventory/add-inventory.component';
import { ViewVariantsComponent } from './products/view-variants/view-variants.component';
import { SubscriptionComponent } from './subscription/subscription/subscription.component';
import { SubscriptionTableComponent } from './subscription/subscription-table/subscription-table.component';
import { BlogCatModalComponent } from './Blogs/blog-cat-modal/blog-cat-modal.component';
import { BlogCatTableComponent } from './Blogs/blog-cat-table/blog-cat-table.component';
import { BlogTagModalComponent } from './Blogs/blog-tag-modal/blog-tag-modal.component';
import { BlogTagTableComponent } from './Blogs/blog-tag-table/blog-tag-table.component';
import { BlogModalComponent } from './Blogs/blog-modal/blog-modal.component';
import { BlogTableComponent } from './Blogs/blog-table/blog-table.component';
import { BlogDataComponent } from './Blogs/blog-data/blog-data.component';
import { BlogDetailsComponent } from './Blogs/blog-details/blog-details.component';
import { FeaturedTableComponent } from './FeaturedProduct/featured-table/featured-table.component';
import { FeaturedModalComponent } from './FeaturedProduct/featured-modal/featured-modal.component';
import { FeaturedDataComponent } from './FeaturedProduct/featured-data/featured-data.component';
import { PopularTableComponent } from './Popular/popular-table/popular-table.component';
import { PopularDataComponent } from './Popular/popular-data/popular-data.component';
import { PopularModalComponent } from './Popular/popular-modal/popular-modal.component';
import { FaqDataComponent } from './FAQ/faq-data/faq-data.component';
import { FaqNewTableComponent } from './FAQ/faq-new-table/faq-new-table.component';
import { FaqModalNewComponent } from './FAQ/faq-modal-new/faq-modal-new.component';
import { AddGiftComponent } from './Gift/add-gift/add-gift.component';
import { AddGiftInventoryComponent } from './Gift/add-gift-inventory/add-gift-inventory.component';
import { GitDataComponent } from './Gift/git-data/git-data.component';
import { GitListComponent } from './Gift/git-list/git-list.component';
import { GiftTableComponent } from './Gift/gift-table/gift-table.component';
import { GiftViewComponent } from './Gift/gift-view/gift-view.component';
import { GiftIncludeModalComponent } from './Gift/gift-include-modal/gift-include-modal.component';
import { EventDataComponent } from './Events/event-data/event-data.component';
import { EventViewComponent } from './Events/event-view/event-view.component';
import { GiftInventoryComponent } from './Gift/gift-inventory/gift-inventory.component';
import { EventTableNewComponent } from './Events/event-table-new/event-table-new.component';
import { EventModalNewComponent } from './Events/event-modal-new/event-modal-new.component';
import { EventMediaModalComponent } from './Events/event-media-modal/event-media-modal.component';
// import { NgToastModule } from 'ng-angular-popup';
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
    DeleteConfirmationComponent,
    CountryTableComponent,
    CountriesTableComponent,
    CountriesModalComponent,
    CityTableComponent,
    CityModalComponent,
    LocationTableComponent,
    LocationModalComponent,
    FaqTableComponent,
    FaqModalComponent,
    EventTableComponent,
    EventModalComponent,
    TaxTableComponent,
    TaxModalComponent,
    ViewProductComponent,
    NewOrderTableComponent,
    ProcessOrderTableComponent,
    ConfirmOrderTableComponent,
    ShippedOrderTableComponent,
    DeliveredOrderTableComponent,
    CanceledOrderTableComponent,
    RefundOrderTableComponent,
    DeletedOrderTableComponent,
    OrderStatusModalComponent,
    OrderDetailsComponent,
    PaymentStatusModalComponent,
    AddVariantComponent,
    AddInventoryComponent,
    ViewVariantsComponent,
    SubscriptionComponent,
    SubscriptionTableComponent,
    BlogCatModalComponent,
    BlogCatTableComponent,
    BlogTagModalComponent,
    BlogTagTableComponent,
    BlogModalComponent,
    BlogTableComponent,
    BlogDataComponent,
    BlogDetailsComponent,
    FeaturedTableComponent,
    FeaturedModalComponent,
    FeaturedDataComponent,
    PopularTableComponent,
    PopularDataComponent,
    PopularModalComponent,
    FaqDataComponent,
    FaqNewTableComponent,
    FaqModalNewComponent,
    AddGiftComponent,
    AddGiftInventoryComponent,
    GitDataComponent,
    GitListComponent,
    GiftTableComponent,
    GiftViewComponent,
    GiftIncludeModalComponent,
    EventDataComponent,
    EventViewComponent,
    GiftInventoryComponent,
    EventTableNewComponent,
    EventModalNewComponent,
    EventMediaModalComponent,
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
    DragDropModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule
    // NgToastModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
