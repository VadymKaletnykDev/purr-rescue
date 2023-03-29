import './App.css';
import { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register'
import {Shop} from './Shop'

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
    </div>
  );
}

export default App;
