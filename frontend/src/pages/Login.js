import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {

    const navigate = useNavigate();

    return (
        <div>
            Login Page
            <form>
                <ul>
                    <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"


                            required
                        />
                    </li>
                    <li>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"


                            required                        
                        />
                    </li>
                        <button type="button" class="btn btn-primary" onClick={() => navigate('/Home')}>
                            Login
                        </button>
                    <li>
                        <label>Don't have account? <Link to="/SignUp">SignUp</Link></label>
                    </li>
                </ul>
            </form>
            
        </div>
    );
}

export default Login;