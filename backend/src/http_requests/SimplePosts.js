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
import Verification from "../schemas/account/Verification.js";


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
          const previousSave = await SavedRecipe.findOne({user_id: req.body.user_id, recipe_id: req.body.recipe_id});
          if (previousSave) { 
            console.log("Recipe already saved by user");
            res.status(400).send("Recipe already saved by user");
            return;
          }
          await incrementSaves(req.body.recipe_id);
          break;
        case "Verification":
          console.log("Verification", req.body);
          req.body.date_created = new mongoose.Schema.Types.Date().cast(Date.now());
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

async function incrementSaves(recipe_id) {
  const updateRecipe = await Recipe.findOneAndUpdate(
    {_id: recipe_id},
    { $inc: { saves: 1 } },
    {new: true}
  );
  console.log("Updated Recipe:", updateRecipe);
}

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

function handleApprove() {
  return async (req, res) => {
    try {
      console.log(req.body);
      const user = await User.findById(req.body._id );
      console.log(user);
      if (!user) {
        return res.status(400).send("User not found");
      }

      user.status = true;
      await user.save();

      await Verification.deleteMany({ user_id: user._id });

      res.status(200).send("User approved and verifications deleted");
    } catch (error) {
      console.error("Error in handleApprove:", error);
      res.status(500).send("Internal server error");
    }
  };
}

function handleVerificationDelete() {
  return async (req, res) => {
    try {

      const deletedVerification = await Verification.deleteMany({ user_id:req.body._id});

      if (!deletedVerification) {
        return res.status(404).send("Verification not found");
      }

      
      console.log("Verification deleted:", deletedVerification)
      res.status(200).send("Verification deleted successfully");
    } catch (error) {
      console.error("Error in handleVerificationDelete:", error);
      res.status(500).send("Internal server error");
    }
  };
}


router.post(`/submitRecipe`, handleCreate(Recipe));
router.post(`/submitIngredient`, handleCreate(Ingredient));
router.post(`/submitRating`, handleCreate(RecipeRating));
router.post(`/saveRecipe`, handleCreate(SavedRecipe));




router.post(`/createUser`, handleCreate(User));
router.post(`/Login`, handleCreate(User));
router.post(`/createAdmin`, handleCreate(Admin));
router.post(`/submitVerification`, handleCreate(Verification));
router.post(`/approveUser`, handleApprove());
router.delete(`/deleteVerificationRequest`,handleVerificationDelete());
router.post(`/createReport`, handleCreate(ReportedUser));





export default router;











