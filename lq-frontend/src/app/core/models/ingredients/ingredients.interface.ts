interface IngredientType {
    ingredientTypeId: number;
    name: string;
    active: boolean;
}

interface Ingredient {
  ingredientId: number;
  ingredientType: IngredientType;
  name: string;
}
