import React from 'react';
import './RecipePost.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
export const RecipePost = ({ userName, recipeName, hours, minutes, verified, recipeId}) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const handleSave =  async () => {
        const savedRecipe = {
            recipe_id: recipeId,
            user_id:user._id 
        };
        try {
            const response = await axios.post('http://localhost:9000/saveRecipe', savedRecipe);
            console.log(response);
        } catch (error) {
            console.error('Error saving recipe:', error);
        }
    }

    return (
        <Link to={`/Recipe/${recipeId}`}>
            <div class="recipe-post-container">
                {verified && <span class="material-symbols-outlined verified-badge">new_releases</span>}
                <img src="https://via.placeholder.com/150" alt="Recipe"/>
                <div class="info-container">
                    <h1>{userName}</h1>
                    <h2>{recipeName}</h2>
                    <span><strong>Time:</strong> {hours}hr {minutes} min</span>
                </div>
                <span class="material-symbols-outlined save-button" onClick={handleSave}>bookmark</span>
            </div>
        </Link>
    );
};
