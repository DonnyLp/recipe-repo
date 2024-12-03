import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { RecipePost } from '../components/RecipePost/RecipePost';

const RecipeSearchPage = () => {
  const [recipes, setRecipes] = useState([]);
  const name = useParams().name;

  console.log("Name:", name);

  useEffect(() => {
    if (name) {
      handleSearch();
    }
  }, []);

  const handleSearch = async () => {
    try {
      // Fetch recipes
      const response = await axios.get(`http://localhost:9000/getRecipes`);
      const fetchedRecipes = response.data;

      // Fetch user names for each recipe
      const recipesWithUserNames = await Promise.all(
        fetchedRecipes.map(async (recipe) => {
          try {
            const userResponse = await axios.get(
              "http://localhost:9000/getUsersFromRecipe",
              {
                params: { _id: recipe[2].user_id }, // Assuming recipe has a user_id
              }
            );
            // Attach user name to the recipe
            recipe[2].user_name = userResponse.data[0]?.username || "Unknown User";
          } catch (error) {
            console.error("Error fetching user for recipe:", recipe._id, error);
            recipe[2].user_name = "Unknown User"; // Fallback in case of error
          }
          return recipe;
        })
      );

      // Set recipes with user names
      setRecipes(recipesWithUserNames);
      console.log("Recipes with user names:", recipesWithUserNames);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="recipe-search-page">
        <Navbar />
        {recipes.filter(
            recipe =>
                recipe[2]?.recipe_name && 
                recipe[2].recipe_name.toLowerCase() === name.toLowerCase() 
        ).length > 0 ? (
            recipes
                .filter(
                    recipe =>
                        recipe[2]?.recipe_name && 
                        recipe[2].recipe_name.toLowerCase() === name.toLowerCase() 
                )
                .map((recipe) => (
                    <RecipePost
                        key={recipe[2]._id} 
                        userName={recipe[2].user_name} 
                        recipeName={recipe[2].recipe_name} 
                        hours={recipe[2].hours} 
                        minutes={recipe[2].minutes} 
                        verified={recipe[2].verified}  
                        saves={recipe[2].saves}
                        
                    />
                ))
        ) : (
            <p>No recipes found.</p>
        )}
    </div>
);


};

export default RecipeSearchPage;