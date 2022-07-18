import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  protected product: Product;
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const theProductId: number = +this.route.snapshot.paramMap.get('id');
    this.getProduct(theProductId);
  }
  getProduct(theProductId:number){
    this.productService.getProduct(theProductId).subscribe(
      data => {
      this.product = data;
      }
      );
  }


}
