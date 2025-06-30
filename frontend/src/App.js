
import './App.css';
import { Navbar } from './Componets/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Shop} from './Pages/Shop';
import { ShopCategory } from "./Pages/ShopCategory"
import { Product } from "./Pages/Product";
import { Cart } from "./Pages/Cart";
import { LoginSignup } from './Pages/LoginSignup';
import { Footer } from './Componets/Footer/Footer';
import mens_banner from './Componets/Assets/banner_mens.png'
import kids_banner from './Componets/Assets/banner_kids.png'
import womens_banner from './Componets/Assets/banner_women.png'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path="/mens" element={<ShopCategory category="men" banner={mens_banner}/>} />
          <Route path="/womens" element={<ShopCategory category="women" banner={womens_banner} />} />
          <Route path="/kids" element={<ShopCategory category="kid" banner={kids_banner}/>} />

          <Route path="/product" element={<Product/>} />
          <Route path="/product/:productId" element={<Product />} />
           

          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>

      </BrowserRouter>
       <Footer/>

    </div>
  );
}

export default App;

// console.log(Navbar, Shop, ShopCategory, Product, Cart, LoginSignup);

