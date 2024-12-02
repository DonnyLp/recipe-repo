import React from "react";

import { Navbar } from '../components/Navbar';
import { PostRecipe } from '../components/PostRecipe';

const Profile = () => {
    return(
        <div>
            <Navbar />
            <PostRecipe />
            User Profile
        </div>
    );
};

export default Profile;