import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredient, IngredientType } from 'src/app/core/models/ingredients/ingredients.interface';

@Component({
  selector: 'app-modal-edit-ingredient',
  templateUrl: './modal-edit-ingredient.component.html',
  styleUrls: ['./modal-edit-ingredient.component.css']
})
export class ModalEditIngredientComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() ingredient!: Ingredient;
  @Input() typeIngredients!: IngredientType[];
  editIngredient!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}


  ngOnInit(): void {
    this.editIngredient = this.fb.group({
      name: [this.ingredient.name, [Validators.required]],
      type: [this.ingredient.ingredientType, [Validators.required]],
      status: [this.ingredient.active, [Validators.required]]
    });
  }
}
