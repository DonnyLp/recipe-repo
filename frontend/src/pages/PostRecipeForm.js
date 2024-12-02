import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostRecipeForm = () => {
    const [recipe_name, setRecipeName] = useState('');
    const [instructions, setInstructions] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [cuisineType, setCuisineType] = useState('');
    const [prep_time, setPrepTime] = useState('');
    const [cook_time, setCookTime] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async(event, recipe_name, instructions, ingredients, cuisineType, prep_time, cook_time) => {
        event.preventDefault();
        const recipe = {
            recipe_name: recipe_name,
            instructions: instructions,
            ingredients: ingredients,
            cuisineType: cuisineType,
            prep_time: prep_time,
            cook_time: cook_time
        };

        try {
            const response = await axios.post('http://localhost:9000/submitRecipe', recipe);
            console.log(response);
        } catch(error) {
            console.error(error);
        }

    }

    return(
        <div className="loginContainer">
            <form >
                <div className="form-group" style={{margin: '5px 0px 5px 0px'}}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Recipe Name"
                        value={recipe_name}
                        onChange={(e) => setRecipeName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group" style={{margin: '5px 0px 5px 0px'}}>
                <input
                        type="text"
                        className="form-control"
                        placeholder="Instructions"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group" style={{margin: '5px 0px 5px 0px'}}>
                <input
                        type="text"
                        className="form-control"
                        placeholder="Ingredients"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group" style={{margin: '5px 0px 5px 0px'}}>
                <input
                        type="text"
                        className="form-control"
                        placeholder="Cuisine Type"
                        value={cuisineType}
                        onChange={(e) => setCuisineType(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group" style={{margin: '5px 0px 5px 0px'}}>
                <input
                        type="text"
                        className="form-control"
                        placeholder="Preparation Time"
                        value={prep_time}
                        onChange={(e) => setPrepTime(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group" style={{margin: '5px 0px 5px 0px'}}>
                <input
                        type="text"
                        className="form-control"
                        placeholder="Cook Time"
                        value={cook_time}
                        onChange={(e) => setCookTime(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group" style={{margin: '5px 0px 5px 0px'}}>
                    <button className="btn btn-secondary" onClick={(e) => {navigate('/Home')}}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={(event) => handleSubmit(event, recipe_name, instructions, ingredients, prep_time, cook_time)}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostRecipeForm;