import React, {useState, useEffect} from "react"
import { firestore } from './firebase/firebase'

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [dateRegistred, setDateRegistred] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
          const date = new Date();
          const formattedDate = date.toLocaleString();
          setDateRegistred(formattedDate);
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        await firestore.collection('users').add({ name, email, password, dateRegistred });
        console.log('FROM Register: User registered successfully into Firestore database!');
        props.onFormSwitch('login');
    };

    const handleRegisterLinkClick = () => {
        // switch to the registration form and change background image
        props.onFormSwitch('login');
    }

    return (
        <div className="register-page-container">
            <div className="register-form-container">
                <h2 className="login-title">REGISTER</h2>
                <form onSubmit={handleSubmit}>
                <label className="register-label" htmlFor="name">Enter your NAME</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} 
                    type="name" placeholder="Name and last name" id="name" name="name" />

                    <label className="register-label" htmlFor="email">Enter your EMAIL</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} 
                    type="email" placeholder="youremail@gmail.com" id="email" name="email" />

                    <label className="register-label" htmlFor="password">Enter your PASSWORD</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} 
                    type="password" placeholder="********" id="password" name="password" />

                    <button type="submit">Register</button>
                </form>
                <div className="register-link" onClick={handleRegisterLinkClick}>Already have an account? LOGIN here</div>
            </div>
        </div>
    )
}