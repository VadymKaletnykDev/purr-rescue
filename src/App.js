import './App.css';
import { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register'

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName)=> {
    setCurrentForm(formName);
  }  
  return (
    <div className="App">      
      {currentForm === "login" && <Login onFormSwitch={toggleForm}/>}
      {currentForm === "register" && <Register onFormSwitch={toggleForm}/>}
    </div>
  );
}

export default App;
