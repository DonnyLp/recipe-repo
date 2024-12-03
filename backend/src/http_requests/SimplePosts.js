import express from "express";
import Recipe from "../schemas/recipe/Recipe.js";
import Ingredient from "../schemas/recipe/Ingredient.js";
import RecipeRating from "../schemas/recipe/RecipeRating.js";
import User from "../schemas/account/User.js";
import SavedRecipe from "../schemas/account/SavedRecipe.js";
import Admin from "../schemas/account/Admin.js";
import ReportedUser from "../schemas/report/ReportedUser.js";
import { HashPassword } from "../Util/Util.js";
import mongoose, { mongo } from "mongoose";


const router = express.Router();

export const handleCreate = (schema) => {
  return async (req, res) => {
    try {
      console.log(`POST ${schema.modelName}:\n${req.body}`);
      switch (schema.modelName) {
        case "Report":
          await handleReport(data);
          break;
        case "User":
          const hashedPassword = await HashPassword(req.body.password_hash);
          req.body.password_hash = hashedPassword;
          console.log(`POST ${schema.modelName}:\n${req.body.email}`);
          break;
        case "Recipe":
          req.body.date_created = new mongoose.Schema.Types.Date().cast(Date.now());
          req.body.preparation_time = new mongoose.Schema.Types.Number().cast(req.body.preparation_time);
          req.body.cooking_time = new mongoose.Schema.Types.Number().cast(req.body.cooking_time);
          req.body.saves = new mongoose.Schema.Types.Number().cast(0);
          break;
        case "SavedRecipe":
          req.body.date_created = new mongoose.Schema.Types.Date().cast(Date.now());
          const updateRecipe = await Recipe.findOneAndUpdate(
            {_id: req.body.recipe_id},
            { $inc: { saves: 1 } },
            {new: true}
          );
          break;
      }

      const data = new schema(req.body);
      console.log("dfffsdfsdf",data);
      await data.save();

      res.status(201).send(data);
      console.log(`POST ${schema.modelName}:\n${data}`);
    } catch (error) {
      console.error(`Error in ${schema.modelName} creation:`, error);
      res.status(500).send(error);
    }
  };
};

async function handleReport(report) {
  try {
    const reportedUser = new ReportedUser({
      report_id: report._id,
      user_id: report.body.user_id,
    });
    await reportedUser.save();
    console.log(`Created reportedUser:\n${reportedUser}`);
  } catch (error) {
    console.error("Error in handleReport:", error);
  }
}




router.post(`/submitRecipe`, handleCreate(Recipe));
router.post(`/submitIngredient`, handleCreate(Ingredient));
router.post(`/submitRating`, handleCreate(RecipeRating));
router.post(`/saveRecipe`, handleCreate(SavedRecipe));



router.post(`/createUser`, handleCreate(User));
router.post(`/Login`, handleCreate(User));
router.post(`/createAdmin`, handleCreate(Admin));



router.post(`/createReport`, handleCreate(ReportedUser));

export default router;











