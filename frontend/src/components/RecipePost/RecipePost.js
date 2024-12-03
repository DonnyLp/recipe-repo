import React from 'react';
import './RecipePost.scss';
export const RecipePost = ({ userName, recipeName, hours, minutes, verified, onSave}) => {
    
    const handleSave = () => {
        onSave('Recipe: ' + recipeName + ' saved');
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
