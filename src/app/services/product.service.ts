import { ProductCategory } from './../common/product-category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';
constructor(private httpClient: HttpClient) { }

getProductList(theCategoryId: number): Observable<Product[]> {

const url = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

return this.httpClient.get<GetResponse>(url).pipe(
map(response => response._embedded.products)
);
}
getProductListPaginate(thePage: number,
                        thePageSize: number,
                        theCategoryId: number): Observable<GetResponseProducts> {

      const url = `${this.baseUrl}/search/findByCategoryId`
      + `?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`
      ;

      return this.httpClient.get<GetResponseProducts>(url);
  }
getProductCategories(): Observable<ProductCategory[]> {

  return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
  map(response => response._embedded.productCategory)
  );
  }

searchProducts(theKeyword: string): Observable<Product[]> {

    // need to build URL based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
    ;

    return this.httpClient.get<GetResponseProducts>(searchUrl)
    .pipe(
    map(response => response._embedded.products));

    }
getProduct(theProductId:number):Observable<Product>{
  const productUrl = `${this.baseUrl}/${theProductId}`;
  return this.httpClient.get<Product>(productUrl);
}





}
interface GetResponse {
  _embedded: {
  products: Product[];
  }
  }

interface GetResponseProductCategory {
    _embedded: {
    productCategory: ProductCategory[];
    }
  }

interface GetResponseProducts {
    _embedded: {
    products: Product[];
    }
    "page" : {
      "size" : number,
      "totalElements" : number,
      "totalPages" : number,
      "number" : number
      }
    }
