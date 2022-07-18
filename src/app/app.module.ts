import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
                      {path: 'category/:id', component: ProductListComponent},
                      {path: 'category', component: ProductListComponent},
                      {path: 'products', component: ProductListComponent },
                      {path: 'search/:keyword', component: ProductListComponent},
                      {path: 'products/:id', component: ProductDetailsComponent},
                      {path: '', redirectTo: '/products', pathMatch: 'full'},
                      {path: '**', redirectTo: '/products', pathMatch: 'full'}
                      ];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductCategoryMenuComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent],

  exports: [RouterModule]
})
export class AppModule {


}
