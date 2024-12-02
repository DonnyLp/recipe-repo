import React, { useEffect } from 'react';
import './Home.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Navbar } from '../../components/Navbar';
import { PostRecipe } from '../../components/PostRecipe';
import { RecipePost } from '../../components/RecipePost/RecipePost';   

const Home = () => {

    const [recipes, setRecipies] = React.useState([]);
    
    useEffect(() => {
       const getRecipes = async () => {
           try {
               const response = await axios.get('http://localhost:9000/getRecipes');
               setRecipies(response.data);
           } catch(error) {
               console.error(error);
           }
       }
         getRecipes();
    }, []);
    return(
        <div class="home-container">
            <Navbar />
            <PostRecipe />
            <div class="recipe-posts-container">
                {recipes.map((recipe) => {
                    return <RecipePost 
                        userName={recipe.userName} 
                        recipeName={recipe.recipeName} 
                        hours={recipe.hours} 
                        minutes={recipe.minutes} 
                    />
                }
                )}
            </div>
        </div>
    );
}

export default Home;