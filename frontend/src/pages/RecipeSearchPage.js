import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

const RecipeSearchPage = () => {
  const [recipes, setRecipes] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const recipe_name = params.get('recipe_name') || '';
    if (recipe_name) {
      handleSearch(recipe_name);
    }
  }, [location.search]);

  const handleSearch = async (recipe_name) => {
    try {
      const response = await axios.get('/search', { params: { recipe_name } });
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="results">
        <h2>Recipes</h2>
        <table>
          <thead>
            <tr>
              <th>Recipe Name</th>
              <th>Instructions</th>
              <th>Date Created</th>
              <th>Cuisine Type</th>
              <th>Preparation Time</th>
              <th>Cooking Time</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe._id}>
                <td>{recipe.recipe_name}</td>
                <td>{recipe.instructions}</td>
                <td>{new Date(recipe.date_created).toLocaleDateString()}</td>
                <td>{recipe.cuisine_type}</td>
                <td>{recipe.preparation_time}</td>
                <td>{recipe.cooking_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecipeSearchPage;