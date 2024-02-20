import { SubscriptionComponent } from './subscription/subscription/subscription.component';
import { ViewVariantsComponent } from './products/view-variants/view-variants.component';
import { AddInventoryComponent } from './products/add-inventory/add-inventory.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { ViewProductComponent } from './products/view-product/view-product.component';
import { OrdersComponent } from './orders/orders/orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './products/product/product.component';
import { SignupComponent } from './signup/signup.component';
import { QueriesComponent } from './queries/queries/queries.component';
import { CustomersComponent } from './customers/customers/customers.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AddProductVariantComponent } from './products/add-product-variant/add-product-variant.component';
import { UploadsComponent } from './uploads/uploads.component';
import { MasterDataComponent } from './master/master-data/master-data.component';
import { EcommSequenceComponent } from './sequence/ecomm-sequence/ecomm-sequence.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'queries', component: QueriesComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'products/productList', component: ProductListComponent },
  { path: 'products/addProduct/:productId', component: AddProductComponent },
  { path: 'products/addVariant/:id/:variantId', component: AddProductVariantComponent },
  { path: 'uploads', component: UploadsComponent },
  { path: 'masterData', component: MasterDataComponent },
  { path: 'EcomSequence', component: EcommSequenceComponent },
  { path: 'viewProduct/:id', component: ViewProductComponent },
  { path: 'orderDetails/:id', component: OrderDetailsComponent },
  { path: 'Inventory/:id', component: AddInventoryComponent },
  { path: 'ViewInventory/:id', component: ViewVariantsComponent },
  { path: 'Subscription', component: SubscriptionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
