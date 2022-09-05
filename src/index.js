import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';
import  {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Addproduct from './components/Addproduct';
import Cart from './components/Cart';
import Details from './components/Details';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
    <Route exact path ="/" element={<App />} />
    <Route exact path ="/addproduct" element={<Addproduct/>} />
    <Route exact path ="/cart" element={<Cart/>}/>
    <Route exact path='/details/:id' element={<Details data={store}/>}/>
    </Routes>
    </Router>
  </Provider>
);
