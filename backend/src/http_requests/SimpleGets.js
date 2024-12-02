import App from "../App.js";
import Recipe from "../schemas/recipe/Recipe";
import Ingredient from "../schemas/recipe/Ingredient";
import RecipeRating from "../schemas/recipe/RecipeRating";
import User from "../schemas/account/User";
import SavedRecipe from "../schemas/account/SavedRecipe";
import Admin from "../schemas/account/Admin";

export const handleGet = (schema) => {
    return async (req, res) => {
        try {
            const data = await schema.findById(req.query.id).exec();
            if (!data) {
                res.status(404).send({ message: 'Data not found' });
                return;
            }
            let sanitizedData = data.toObject();
            switch (schema.modelName) {
                case 'User':
                    console.log(`GET ${schema.modelName}:\n${sanitizedData.email}`);
                    delete sanitizedData.password_hash;
                break;
                default:
                    console.log(`GET ${schema.modelName}:\n${sanitizedData}`);
                break;
            }
            res.send(sanitizedData);
        } catch (error) {
            console.error('Error retrieving data:', error);
            res.status(500).send(error);
        }
    };
};


App.get(`/getRecipe`,handleGet(Recipe));
App.get(`/getIngredient`,handleGet(Ingredient));
App.get(`/getRating`,handleGet(RecipeRating));
App.get(`/getUser`,handleGet(User));
App.get(`/getSavedRecipe`,handleGet(SavedRecipe));
App.get(`/getAdmin`,handleGet(Admin));



