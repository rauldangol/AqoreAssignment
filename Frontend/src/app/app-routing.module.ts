import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetProductsComponent } from './components/product/get-products/get-products.component';
import { GetCategoryComponent } from './components/category/get-category/get-category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { AddProductsComponent } from './components/product/add-products/add-products.component';
import { EditProductsComponent } from './components/product/edit-products/edit-products.component';
import { GetCustomerComponent } from './components/customer/get-customer/get-customer.component';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/customer/edit-customer/edit-customer.component';
import { GetSalesTransactionsComponent } from './components/salesTransaction/get-sales-transactions/get-sales-transactions.component';
import { AddSalesTransactionComponent } from './components/salesTransaction/add-sales-transaction/add-sales-transaction.component';
import { EditSalesTransactionComponent } from './components/salesTransaction/edit-sales-transaction/edit-sales-transaction.component';
import { GetInvoiceComponent } from './components/invoice/get-invoice/get-invoice.component';
import { AddInvoiceComponent } from './components/invoice/add-invoice/add-invoice.component';
import { EditInvoiceComponent } from './components/invoice/edit-invoice/edit-invoice.component';
import { HomeStatsComponent } from './components/home-stats/home-stats.component';

const routes: Routes = [
  {path: "view/categories", component: GetCategoryComponent},
  {path: "add/category", component: AddCategoryComponent},
  {path: "edit/categories/:categoryId", component:EditCategoryComponent},
  {path: "view/products", component: GetProductsComponent},
  {path: "add/product", component: AddProductsComponent},
  {path: "edit/product/:productId", component: EditProductsComponent},
  {path: "view/customers", component: GetCustomerComponent},
  {path: "add/customer", component: AddCustomerComponent},
  {path: "edit/customers/:customerId", component: EditCustomerComponent},
  {path: "view/sales-transactions", component: GetSalesTransactionsComponent},
  {path: "add/sales-transaction", component: AddSalesTransactionComponent},
  {path: "edit/sales-transaction/:transactionId", component: EditSalesTransactionComponent},
  {path: "view/invoice", component: GetInvoiceComponent},
  {path: "add/invoice", component: AddInvoiceComponent},
  {path: "edit/invoice/:invoiceId", component: EditInvoiceComponent},
  {path: "home", component: HomeStatsComponent},
  {path: "", component:HomeStatsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
