import React from 'react';
import './RecipePost.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
export const RecipePost = ({ userName, recipeName, hours, minutes, verified, recipeId, saves}) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if(!saves){
        saves = 0;
    }
    const handleSave =  async () => {
        const savedRecipe = {
            recipe_id: recipeId,
            user_id:user._id 
        };
        try {
            const response = await axios.post('http://localhost:9000/saveRecipe', savedRecipe);
            if(response.status === 201){
                saves++;
            }
            console.log(response);
        } catch (error) {
            console.error('Error saving recipe:', error);
        }
    }

    return (
            <div class="recipe-post-container">
                <img src="https://via.placeholder.com/150" alt="Recipe"/>
        <Link to={`/Recipe/${recipeId}`}>

                <div class="info-container">
                    <h1>{userName} {verified && <span class="material-symbols-outlined verified-badge">new_releases</span>}</h1>
                    <h2>{recipeName}</h2>
                    <span><strong>Time:</strong> {hours}hr {minutes} min</span>
                </div>
        </Link>
                <div className="action-container">
                <span className="material-symbols-outlined save-button" onClick={handleSave}>
                    bookmark
                </span>
                <span className="recipe-number">{saves}</span>
            </div>
            </div>
    );
    
};
