import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async(event, username, password) => {
        event.preventDefault();

        navigate('/Home'); //temporary until we can get user verification up and running

        //axios post for user verification
    }

    return (
        <div className="loginContainer">
            <form>
                <div className="form-group" style={{margin: '5px 0px 5px 0px'}}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group" style={{margin: '5px 0px 5px 0px'}}>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required                        
                    />
                </div>
                <div className="form-group">
                    <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={(event) => handleSubmit(event, username, password)}
                    >
                    Login
                    </button>
                </div>
                
                <label>Don't have account? <Link to="/SignUp">SignUp</Link></label>
            </form>
        </div>
    );
}

export default Login;