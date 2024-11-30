import App from "../App";
import Recipe from "../schemas/recipe/Recipe";
import Ingredient from "../schemas/recipe/Ingredient";
import RecipeRating from "../schemas/recipe/RecipeRating";
import User from "../schemas/account/User";
import SavedRecipe from "../schemas/account/SavedRecipe";
import Admin from "../schemas/account/Admin";

export const handleCreate = (schema) => {
  return async (req, res) => {
    try {
      const data = new schema(req.body);
      await data.save();
      res.send(data);
      console.log(`POST ${schema.modelName}:\n${data}`)
    } catch (error) {
      res.status(500).send(error);
    }
  };
};
// work via App.post(`URL`, handleCreate(SCHEMA));

App.post(`/submitRecipe`, handleCreate(Recipe));
App.post(`/submitIngredient`, handleCreate(Ingredient));
App.post(`/submitRating`, handleCreate(RecipeRating));
App.post(`/signupUser`, handleCreate(User));
App.post(`/saveRecipe`, handleCreate(SavedRecipe));
App.post(`/createAdmin`, handleCreate(Admin));