import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { RecipePost } from '../components/RecipePost/RecipePost';

const RecipeSearchPage = () => {
  const [recipes, setRecipes] = useState([]);
  const name = useParams().name;
  console.log('Name:', name);
  useEffect(() => {
    if (name) {
      handleSearch(name);
    }
  }, []);

  
  console.log('Recipes:', recipes);
  const handleSearch = async (recipe_name) => {
    try {
      const response = await axios.get(`http://localhost:9000/getRecipes`);
      setRecipes(response.data);
      console.log('Recipes:', response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
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
                        userName={recipe[2].username} 
                        recipeName={recipe[2].recipe_name} 
                        hours={recipe[2].hours} 
                        minutes={recipe[2].minutes} 
                        verified={recipe[2].verified}  
                    />
                ))
        ) : (
            <p>No recipes found.</p>
        )}
    </div>
);


};

export default RecipeSearchPage;