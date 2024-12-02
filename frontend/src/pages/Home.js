import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Navbar } from '../components/Navbar';

const Home = () => {
    return(
        <div>
            <Navbar />
            Home Page
        </div>
    );
}

export default Home;