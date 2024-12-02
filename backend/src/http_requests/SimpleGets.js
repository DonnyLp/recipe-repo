import express from "express";
import Recipe from "../schemas/recipe/Recipe.js";
import Ingredient from "../schemas/recipe/Ingredient.js";
import RecipeRating from "../schemas/recipe/RecipeRating.js";
import User from "../schemas/account/User.js";
import SavedRecipe from "../schemas/account/SavedRecipe.js";
import Admin from "../schemas/account/Admin.js";

const router = express.Router();

export const handleGet = (schema) => {
    return async (req, res) => {
        try {
            const id = req.query._id;
            if (!id) {
                res.status(400).send({ message: "Missing 'id' query parameter" });
                return;
            }
            const data = await schema.findById(id).exec();
            if (!data) {
                res.status(404).send({ message: "Data not found" });
                return;
            }
            let sanitizedData = data.toObject();
            switch (schema.modelName) {
                case "User":
                    console.log(`GET ${schema.modelName}:\n${sanitizedData.email}`);
                    delete sanitizedData.password_hash;
                    break;
                default:
                    console.log(`GET ${schema.modelName}:\n${sanitizedData}`);
                    break;
            }

            res.send(sanitizedData);
        } catch (error) {
            console.error("Error retrieving data:", error);
            res.status(500).send(error);
        }
    };
};

router.get(`/getRecipes`, handleGet(Recipe));
router.get(`/getIngredient`, handleGet(Ingredient));
router.get(`/getRating`, handleGet(RecipeRating));
router.get(`/getUser`, handleGet(User));
router.get(`/getSavedRecipe`, handleGet(SavedRecipe));
router.get(`/getAdmin`, handleGet(Admin));

export default router;
