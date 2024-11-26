import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {

    return (
        <div>
            SignUp Page
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
                    <li>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"


                            required                        
                        />
                    </li>
                    <li>
                        <button>
                            Sign Up
                        </button>
                    </li>
                    <li>
                        <label>Already have account? <Link to="/Login">Login</Link></label>
                    </li>
                </ul>
            </form>
            
        </div>
    );
}

export default SignUp;