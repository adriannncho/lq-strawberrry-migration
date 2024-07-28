import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductMap } from 'src/app/core/models/order-products/products-interface';

@Component({
  selector: 'app-tab-toppings',
  templateUrl: './tab-toppings.component.html',
  styleUrls: ['./tab-toppings.component.css']
})
export class TabToppingsComponent {

  @Input() product! : ProductMap;

  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
      customerName: ['', [Validators.required, Validators.minLength(3)]]
    });
   }


   isTouchedInput(namecontrol: string) {
      this.productForm.controls[namecontrol].markAllAsTouched();
      this.productForm.controls[namecontrol].updateValueAndValidity();
   }
}
