import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  currentCategoryId: number = 1;
  products : Product[];
  thePageNumber: number=1;
  thePageSize: number=12;
  theTotalElements: number;


  constructor( private productService : ProductService,
                private route: ActivatedRoute
            ) {

            }


  ngOnInit() {
      this.route.paramMap.subscribe(()=>{
        this.listProducts();
        console.log(this.products);
    });

  }
  listProducts() {
    const hasCategoryId:boolean = this.route.snapshot.paramMap.has('id');
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');
    if(theKeyword!=null){
      this.productService.searchProducts(theKeyword).subscribe(
        data => {
        this.products = data;
        }
        )
    }
    else if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }

    else{
      this.currentCategoryId = 1;
    }
    this.productService.getProductListPaginate(this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId)
      .subscribe(this.processResult());

    // now get the products for the given category id

    }
  private processResult() {
      return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
      };
      }
  updatePageSize(thePageSize:number){
    this.thePageSize=thePageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  old_listProducts() {
    const hasCategoryId:boolean = this.route.snapshot.paramMap.has('id');
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');
    if(theKeyword!=null){
      this.productService.searchProducts(theKeyword).subscribe(
        data => {
        this.products = data;
        }
        )
    }
    else if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }

    else{
      this.currentCategoryId = 1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
    data => {
    this.products = data;
    }
    )
  }



}
