import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngredientMapCreate, LinkedProduct } from 'src/app/core/models/ingredients/ingredients.interface';
import { Ingredient, ProductSize } from 'src/app/core/models/order-products/products-interface';

@Component({
  selector: 'app-modal-edit-product',
  templateUrl: './modal-edit-product.component.html',
  styleUrls: ['./modal-edit-product.component.css']
})
export class ModalEditProductComponent {
  @Input() productEdit!: LinkedProduct; 
  @Input() sizes!: ProductSize[]; 
  @Input() isVisible: boolean = false; 
  @Input() tClasics!: Ingredient[]; 
  @Input() premiums!:  Ingredient[]; 
  @Input() sauces!:  Ingredient[]; 
  @Input() capas!:  Ingredient[]; 
  @Output() hideModalEmit = new EventEmitter<boolean>()
  editForm!: FormGroup;
  pendingValidateCant: boolean = true;
  isVisibleCant: boolean = false;
  toppingsPremium: Ingredient[] = []

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.productEdit.name, [Validators.required]],
      description: [this.productEdit.description, [Validators.required]],
      value: [this.productEdit.value, [Validators.required, Validators.min(0)]],
      size: [ this.productEdit.size, [Validators.required]],
      clasics: [this.productEdit.toppingsClasic.map(item => 
        item.ingredient?.ingredientId
      )],
      premium: [this.productEdit.toppingsPremium.map(item => 
        item.ingredient?.ingredientId
      )],
      sauces: [this.productEdit.salsas.map(item => 
        item.ingredient?.ingredientId
      )],
      capas: [this.productEdit.capas.map(item => 
        item.ingredient?.ingredientId
      )],
      cantClasic: [this.productEdit.quantityClasic],
      cantPremium: [this.productEdit.quantityPremium],
      cantSauces: [this.productEdit.quantitySalsa],
    });
  }

  submitForm(): void {
    if (this.editForm.valid) {
      console.log('Producto editado:', this.editForm.value);
    }
  }

  hideModal() {
    this.hideModalEmit.emit(false);
  }

  showModalCant() {
    this.isVisibleCant = true;
  }

  changePremiums(idIngredient: number[]) {
    if(idIngredient) {
      idIngredient.forEach(item => {
        let toppings = this.premiums.filter(fil => fil.ingredientId === item) 
      })

    }
  }
}
