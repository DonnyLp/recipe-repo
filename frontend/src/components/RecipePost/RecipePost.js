import React from 'react';
import './RecipePost.scss';
import axios from 'axios';
export const RecipePost = ({ userName, recipeName, hours, minutes, verified, recipeId, userId}) => {
    
    const handleSave = () => {
        const savedRecipe = {
            recipe_id: recipeId,
            user_id: userId
        };
        try {
            const response = axios.post('http://localhost:9000/saveRecipe', savedRecipe);
            console.log(response);
        } catch (error) {
            console.error('Error saving recipe:', error);
        }
    }

    return (
        <div class="recipe-post-container">
            {verified && <span class="material-symbols-outlined verified-badge">verified</span>}
            <img src="https://via.placeholder.com/150" alt="Recipe"/>
            <div class="info-container">
                <h1>{userName}</h1>
                <h2>{recipeName}</h2>
                <span><strong>Time:</strong> {hours}hr {minutes} min</span>
            </div>
            <span class="material-symbols-outlined save-button" onClick={handleSave}>bookmark</span>
        </div>
    );
};
