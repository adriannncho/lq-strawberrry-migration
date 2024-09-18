import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailAdditional, DetailOrder, Ingredient } from 'src/app/core/models/order-products/products-interface';
import { TypeIngredients } from 'src/app/core/utilities/utilities-interfaces';

@Component({
  selector: 'app-modal-edit-product',
  templateUrl: './modal-edit-product.component.html',
  styleUrls: ['./modal-edit-product.component.css']
})
export class ModalEditProductComponent implements OnInit{

  @Input() isVisebleModal: boolean = false;
  @Input() productOfEdit!: DetailOrder;
  @Input() toppingsPremiumAdd!: Ingredient[];
  @Input() toppingsClasicAdd!: Ingredient[]
  @Input() saucesAdd!: Ingredient[];
  @Input() adicionalesAdd!: Ingredient[];
  @Output() hidenModalEmitter = new EventEmitter<boolean>();
  @Output() saveChangesEmi = new EventEmitter<DetailOrder>();

  productForm!: FormGroup;
  toppingsPremiumSelected: Ingredient[] = [];
  toppingsClasicSelected: Ingredient[] = [];
  saucesSelected: Ingredient[] = [];
  adicionalesSelected: Ingredient[] = [];
  typeIngredients = TypeIngredients;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { 
    this.distribuirToppingsDelProducto(this.productOfEdit.detailAdditionals)
    this.productForm = this.fb.group({
      product: this.fb.group({
        idProduct: [this.productOfEdit.product.idProduct, Validators.required]
      }),
      value: [this.productOfEdit.value, [Validators.required]],
      quantity: [this.productOfEdit.quantity,[ Validators.required, Validators.min(1)]], 
      nameProduct: [this.productOfEdit.nameProduct, [Validators.required, Validators.minLength(3)]],
      nameCustomer: [this.productOfEdit.nameCustomer, [Validators.required]],
      idCombo: [this.productOfEdit.idCombo],
      observation: [this.productOfEdit.observation],
      premiums: [this.toppingsPremiumSelected.map(item => item.ingredientId )],
      clasic: [this.toppingsClasicSelected.map(item => item.ingredientId )],
      sauces: [this.saucesSelected.map(item => item.ingredientId )],
      adicionales: [this.adicionalesSelected.map(item => item.ingredientId )],
    });
  }

  hideModal() {
    this.hidenModalEmitter.emit(true);
  }

  distribuirToppingsDelProducto (adicionales: DetailAdditional[]) {
    adicionales.forEach(item => {
      if (item.idTypeIngredient.ingredientTypeId === this.typeIngredients._TOPPINGS_PREMIUM_ && !item.isAditional) {
        this.toppingsPremiumSelected.push(this.convertirTypoIngrediente(item));
      }else if (item.idTypeIngredient.ingredientTypeId === this.typeIngredients._TOPPINGS_CLASIC_ && !item.isAditional) {
        this.toppingsClasicSelected.push(this.convertirTypoIngrediente(item));
      }else if (item.idTypeIngredient.ingredientTypeId === this.typeIngredients._SAUSES_ && !item.isAditional) {
        this.saucesSelected.push(this.convertirTypoIngrediente(item));
      }else if (item.isAditional) {
        this.adicionalesSelected.push(this.convertirTypoIngrediente(item));
      }
    })
  }

  convertirTypoIngrediente(item: DetailAdditional): Ingredient {
    let ingredient: Ingredient;
    ingredient = {
      ingredientId: item.idIngredient,
      ingredientType: item.idTypeIngredient,
      isAditional: item.isAditional,
      name: item.idTypeIngredient.name,
      checked: true
    }
    return ingredient;
  }

  saveChanges() {
    const aditional: DetailAdditional[] = [
      this.productForm.controls['premiums'].value,
      this.productForm.controls['clasic'].value,
      this.productForm.controls['sauces'].value,
      this.productForm.controls['adicionales'].value
    ]

    const product: DetailOrder = {
      ...this.productOfEdit,
      nameCustomer: this.productForm.controls['nameCustomer'].value,
      quantity: this.productForm.controls['quantity'].value,
      observation: this.productForm.controls['observation'].value,
      detailAdditionals: aditional,
    }
    this.saveChangesEmi.emit(product);
  }

}
