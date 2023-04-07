import './App.css';
import { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register'
import {Shop} from './Shop'
import {Collection} from './Collection'
import {ViewProduct} from './ViewProduct'
import {Account} from './Account'
import {Checkout} from './Checkout'
import {About} from './About'
import {Contact} from './Contact'


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName)=> {
    setCurrentForm(formName);
    console.log('Switching to form: ', formName);
  }  
  return (
    <div className="App">      
      {currentForm === "login" && <Login onFormSwitch={toggleForm}/>}
      {currentForm === "register" && <Register onFormSwitch={toggleForm}/>}
      {currentForm === "shop" && <Shop onFormSwitch={toggleForm}/>}
      {currentForm === "toys" && <Collection onFormSwitch={toggleForm} formName={currentForm}/>}
      {currentForm === "food" && <Collection onFormSwitch={toggleForm} formName={currentForm}/>}
      {currentForm === "litter" && <Collection onFormSwitch={toggleForm} formName={currentForm}/>}
      {currentForm === "clothes" && <Collection onFormSwitch={toggleForm} formName={currentForm}/>}
      {currentForm === "view" && <ViewProduct onFormSwitch={toggleForm} formName={currentForm}/>}
      {currentForm === "account" && <Account onFormSwitch={toggleForm} formName={currentForm}/>}
      {currentForm === "checkout" && <Checkout onFormSwitch={toggleForm} formName={currentForm}/>}
      {currentForm === "about" && <About onFormSwitch={toggleForm} formName={currentForm}/>}
      {currentForm === "contact" && <Contact onFormSwitch={toggleForm} formName={currentForm}/>}
    </div>
  );
}

export default App;
