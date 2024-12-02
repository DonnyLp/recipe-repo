import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async(event, username, password, email) => {
        event.preventDefault();

        //axios post for user signup and verification
        try {
            axios.post('http://localhost:9000/createUser', { username, password, email })
                .catch((err) => {
                    alert("Error in signing up");
                });
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="signupContainer">
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
                <div className="form-group" style={{margin: '5px 0px 5px 0px'}}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required                        
                    />
                </div>
                <div className="form-group">
                    <button 
                    type="button" 
                    class="btn btn-primary"
                    onClick={(event) => handleSubmit(event, username, password, email)}
                    >
                    Sign Up
                    </button>
                </div>
                <label>Already have account? <Link to="/Login">Login</Link></label>
            </form>     
        </div>
    );
}

export default SignUp;