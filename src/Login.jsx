import React, {useState} from "react";
import './App.css';
import { firestore } from './firebase/firebase'

export const Login = (props) => {
    // Variable to store email
    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        firestore.collection('users').where('email', '==', email).get()
        .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        console.log(doc.data());
    });
  });

        
    }

    const handleRegisterLinkClick = () => {
        // switch to the registration form and change background image
        props.onFormSwitch('register');
    }

    return (
        <div className="login-page-container">
            <div className="title-container">
                <h1 className="title-text">Purr Rescue</h1>
            </div>
            <div className="login-form-container">
                <h2 className="login-title">LOGIN</h2>
                <form onSubmit={handleSubmit}>
                    <label className="login-label" htmlFor="email">EMAIL</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} 
                    type="email" placeholder="youremail@gmail.com" id="email" name="email" />

                    <label className="login-label" htmlFor="password">PASSWORD</label>
                    <input value={pass} onChange={(e) => setPassword(e.target.value)} 
                    type="password" placeholder="********" id="password" name="password" />

                    <button type="submit">Login</button>
                </form>
                <div className="register-link" onClick={handleRegisterLinkClick}>Don't have an account? REGISTER here</div>
            </div>
        </div>
    )
}

