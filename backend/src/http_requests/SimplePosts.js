import express from "express";
import Recipe from "../schemas/recipe/Recipe.js";
import Ingredient from "../schemas/recipe/Ingredient.js";
import RecipeRating from "../schemas/recipe/RecipeRating.js";
import User from "../schemas/account/User.js";
import SavedRecipe from "../schemas/account/SavedRecipe.js";
import Admin from "../schemas/account/Admin.js";
import ReportedUser from "../schemas/report/ReportedUser.js";

const router = express.Router();

export const handleCreate = (schema) => {
  return async (req, res) => {
    try {
      const data = new schema(req.body);
      await data.save();
      switch (schema.modelName) {
        case "Report":
          await handleReport(data);
          break;
      }
      res.send(data);
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
router.post(`/signupUser`, handleCreate(User));
router.post(`/createAdmin`, handleCreate(Admin));
router.post(`/createReport`, handleCreate(ReportedUser));

export default router;











