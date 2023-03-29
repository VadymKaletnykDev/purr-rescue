import React, {useState} from "react";
import { firestore } from './firebase/firebase'
import Swal from 'sweetalert';

export const Login = (props) => {
    // Variable to store email
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const showError = (errorTitle, errorMessage) => {
        Swal({
          title: errorTitle,
          text: errorMessage,
          icon: "error",
          button: "OK",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleRegisterLinkClick = () => {
        // switch to the registration form and change background image
        props.onFormSwitch('register');
    }

    const handleLoginClick = () => {

        //Check email field
        if (!email) {
            showError("Missing email", "Please enter your email address to log in.");
            return;
        }

        // switch to the shop form after login validations
        firestore
        .collection('users')
        .where('email', '==', email)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            // Email exists in Firestore
            const user = querySnapshot.docs[0].data();
            if (user.password === password) {
              // Password matches, proceed to change the page or perform any other action
              console.log('FROM Login: ' + email + ' exists in Firestore database and the password matches.');
              props.onFormSwitch('shop');
            } else {
              // Password does not match
              console.log('FROM Login: ' + email + ' exists in Firestore database, but the password does not match.');
              showError("Invalid password", "The password you entered is incorrect. Please try again.");
            }
          } else {
            // Email does not exist in Firestore
            console.log('FROM Login: ' + email + ' does not exists in Firestore database.');
            showError("Invalid email", "The email address you entered is not registered with our shop. Please check your email address and try again.");
          }
        })
        .catch((error) => {
          console.error('Error fetching document: ', error);
        });
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
                    <input value={password} onChange={(e) => setPassword(e.target.value)} 
                    type="password" placeholder="********" id="password" name="password" />

                    <button type="submit" onClick={handleLoginClick}>Login</button>
                </form>
                <div className="register-link" onClick={handleRegisterLinkClick}>Don't have an account? REGISTER here</div>
            </div>
        </div>
    )
}

