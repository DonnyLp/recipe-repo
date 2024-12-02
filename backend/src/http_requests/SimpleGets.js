import express from "express";
import Recipe from "../schemas/recipe/Recipe.js";
import Ingredient from "../schemas/recipe/Ingredient.js";
import RecipeRating from "../schemas/recipe/RecipeRating.js";
import User from "../schemas/account/User.js";
import SavedRecipe from "../schemas/account/SavedRecipe.js";
import Admin from "../schemas/account/Admin.js";
import Report from "../schemas/report/Report.js";
import ReportedUser from "../schemas/report/ReportedUser.js";
import ReportedRating from "../schemas/report/ReportedRating.js";
import ReportedRecipe from "../schemas/report/ReportedRecipe.js";

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
      console.error("Error retrieving data: ", error);
      res.status(500).send(error);
    }
  };
};

export const handleGetList = (schema) => {
  return async (req, res) => {
    try {
      console.log("GET for ", schema.constructor.name)
      const found_objects = await schema.find();
      let response = [];
      for (const object of found_objects) {
        response.push(Object.values(object));
      }
      res.send(response);
    } catch (error) {
      console.error("Error retrieving data: ", error);
      res.status(500).send(error);
    }
  };
};

export const handleGetFrom = (requestedSchema, fromSchema) => {
  return async (req, res) => {
    try {
      console.log(`GET for ${requestedSchema.constructor.name} from ${fromSchema.constructor.name}`)
      let found_objects;
      let response = [];

      switch (fromSchema) {
        case User:
          found_objects = requestedSchema.find({user_id: req.body._id});
          break;
        case Recipe:
          found_objects = requestedSchema.find({recipe_id: req.body._id});
          break;
        case Report:
          found_objects = requestedSchema.find({report_id: req.body._id});
          break;
        case Ingredient:
          found_objects = requestedSchema.find({ingredient_id: req.body._id});
          break;
        default:
          throw new Error("requested fromSchema is not supported/needed!");
      }

      for (const object of found_objects) {
        response.push(Object.values(object));
      }
      res.send(response);
    } catch (error) {
      console.error("Error retrieving data: ", error);
      res.status(500).send(error);
    }
  };
}; // requestedSchema is what kind of object you want and fromSchema is what object your trying to get it from
//    for example getting all of a user's ratings would be
//    handleGetFrom(requestedSchema: RecipeRating, fromSchema: User)
//    and then the code will try to find all RecipeRatings with the user_id of the _id in the req.body

router.get(`/getIngredient`, handleGet(Ingredient));
router.get(`/getRating`, handleGet(RecipeRating));
router.get(`/getUser`, handleGet(User));
router.get(`/getSavedRecipe`, handleGet(SavedRecipe));
router.get(`/getAdmin`, handleGet(Admin));

// gets EVERY element out of the database of this "type"
router.get(`/getAdmins`, handleGetList(Admin));
router.get(`/getUsers`, handleGetList(User));
router.get(`/getIngredients`, handleGetList(Ingredient));
router.get(`/getRecipes`, handleGetList(Recipe));
router.get(`/getReports`, handleGetList(Report));

// gets elements referenced from another
router.get(`/getRatingsFromUser`, handleGetFrom(RecipeRating, User));
router.get(`/getSavedRecipesFromUser`, handleGetFrom(SavedRecipe, User));
router.get(`/getReportedUserFromRating`, handleGetFrom(ReportedUser, Report));
router.get(`/getReportedRatingFromRating`, handleGetFrom(ReportedRating, Report));
router.get(`/getReportedRecipeFromRating`, handleGetFrom(ReportedRecipe, Report));

export default router;
