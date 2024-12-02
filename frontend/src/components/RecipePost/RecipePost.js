import React from 'react';
import './RecipePost.scss';
export const RecipePost = ({userName, recipeName, hours, minutes}) => {
    return (
        <div class="recipe-post-container">
            <img src="https://via.placeholder.com/150" alt="Recipe"/>
            <div class="info-container">
                <h1>{userName}</h1>
                <h2>{recipeName}</h2>
                <span><strong>Time:</strong> {hours}hr {minutes} min</span>
            </div>
        </div>
    );
};
