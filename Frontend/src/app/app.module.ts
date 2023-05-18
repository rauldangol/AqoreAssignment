import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GetProductsComponent } from './components/product/get-products/get-products.component';
import { EditProductsComponent } from './components/product/edit-products/edit-products.component';
import { AddProductsComponent } from './components/product/add-products/add-products.component';
import { GetCategoryComponent } from './components/category/get-category/get-category.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetCustomerComponent } from './components/customer/get-customer/get-customer.component';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/customer/edit-customer/edit-customer.component';
import { GetSalesTransactionsComponent } from './components/salesTransaction/get-sales-transactions/get-sales-transactions.component';
import { EditSalesTransactionComponent } from './components/salesTransaction/edit-sales-transaction/edit-sales-transaction.component';
import { AddSalesTransactionComponent } from './components/salesTransaction/add-sales-transaction/add-sales-transaction.component';
import { AddInvoiceComponent } from './components/invoice/add-invoice/add-invoice.component';
import { EditInvoiceComponent } from './components/invoice/edit-invoice/edit-invoice.component';
import { GetInvoiceComponent } from './components/invoice/get-invoice/get-invoice.component';
import { HomeStatsComponent } from './components/home-stats/home-stats.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    GetProductsComponent,
    EditProductsComponent,
    AddProductsComponent,
    GetCategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    GetCustomerComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    GetSalesTransactionsComponent,
    EditSalesTransactionComponent,
    AddSalesTransactionComponent,
    AddInvoiceComponent,
    EditInvoiceComponent,
    GetInvoiceComponent,
    HomeStatsComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
