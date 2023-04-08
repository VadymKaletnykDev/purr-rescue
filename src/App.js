import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';
import { Shop } from './Shop';
import { Collection } from './Collection';
import {ViewProduct} from './View';
import { Account } from './Account';
import { Checkout } from './Checkout';
import { About } from './About';
import { Contact } from './Contact';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/toys" element={<Collection formName="toys" />} />
        <Route path="/food" element={<Collection formName="food" />} />
        <Route path="/litter" element={<Collection formName="litter" />} />
        <Route path="/clothes" element={<Collection formName="clothes" />} />
        <Route path="/view" element={<ViewProduct />} />
        <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;



