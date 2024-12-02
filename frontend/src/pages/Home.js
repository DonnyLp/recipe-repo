import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Navbar } from '../components/Navbar';
import { PostRecipe } from '../components/PostRecipe';

const Home = () => {
    return(
        <div>
            <Navbar />
            <PostRecipe />
            Home Page
        </div>
    );
}

export default Home;