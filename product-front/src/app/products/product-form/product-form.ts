import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
  standalone: true
})
export class ProductForm implements OnInit {
  product: Product = { name: '', description: '', price: 0 };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.productService.getProduct(+id).subscribe({
        next: p => this.product = p,
        error: err => console.error(err)
      });
    }
  }

  save(): void {
    if (!this.product.name || this.product.name.trim() === '') {
      alert('El nombre es obligatorio');
      return;
    }
    if (!this.product.price || this.product.price <= 0) {
      alert('El precio debe ser mayor que 0');
      return;
    }

    if (this.isEdit && this.product.id) {
      this.productService.updateProduct(this.product.id, this.product).subscribe({
        next: () => this.router.navigate(['/products/list']),
        error: err => console.error(err)
      });
    } else {
      this.productService.createProduct(this.product).subscribe({
        next: () => this.router.navigate(['/products/list']),
        error: err => console.error(err)
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/products/list']);
  }
}
