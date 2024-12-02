import App from "../App";
import Recipe from "../schemas/recipe/Recipe";
import Ingredient from "../schemas/recipe/Ingredient";
import RecipeRating from "../schemas/recipe/RecipeRating";
import User from "../schemas/account/User";
import SavedRecipe from "../schemas/account/SavedRecipe";
import Admin from "../schemas/account/Admin";
import ReportedUser from "../schemas/report/ReportedUser.js";

export const handleCreate = (schema) => {
  return async (req, res) => {
    try {
      const data = new schema(req.body);
      await data.save();
      switch (schema.modelName) {
        case 'Report':
          await handleReport(data);
          break;
      }
      res.send(data);
      console.log(`POST ${schema.modelName}:\n${data}`)
    } catch (error) {
      res.status(500).send(error);
    }
  };
};

async function handleReport(report) {
  const reportedUser = new ReportedUser({
    report_id: report._id,
    user_id: report.body.user_id
  });
  await reportedUser.save();
  console.log(`Created reportedUser \n${reportedUser}`);
}




// work via App.post(`URL`, handleCreate(SCHEMA));
App.post(`/submitRecipe`, handleCreate(Recipe));
App.post(`/submitIngredient`, handleCreate(Ingredient));
App.post(`/submitRating`, handleCreate(RecipeRating));
App.post(`/saveRecipe`, handleCreate(SavedRecipe));

App.post(`/signupUser`, handleCreate(User));
App.post(`/createAdmin`, handleCreate(Admin));

App.post(`/createReport`, handleCreate(Report));















