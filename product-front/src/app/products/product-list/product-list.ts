import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
  standalone: true
})
export class ProductList implements OnInit {

  products: Product[] = [];
  idProduct: number = 0;
  pageSize: number = 5;
  currentPage: number = 1;
  totalItems: number = 0;
  product: Product = { name: '', description: '', price: 0 };

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts(this.currentPage, this.pageSize)
      .subscribe({
        next: (res) => {
          this.products = res || res.items || res.Items || [];
          this.totalItems = res.lenth || res.totalItems || res.TotalItems || 0;
        },
        error: (err) => console.error('Error cargando productos', err)
      });
  }

  search(): void {
    if (this.idProduct != 0 || this.idProduct != null) {
      this.products = [];
      
      this.productService.getProduct(this.idProduct).subscribe({
        next: (res) => {
          this.product = res || null;          
          this.products.push(this.product);
          this.totalItems = this.products.length || 0;
        },
        error: err => console.error(err)
      });
    }
    else {
      this.currentPage = 1;
      this.loadProducts();
    }
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.error('Error eliminando producto', err)
      });
    }
  }
}
