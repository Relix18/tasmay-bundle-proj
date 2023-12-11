import { Toaster } from "react-hot-toast";
import "./App.css";
import Cart from "./Components/Cart";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/auth/Login";
import ShowNavbar from "./Components/auth/ShowNavbar";
import Signup from "./Components/auth/Signup";
import ForgetPassword from "./Components/auth/ForgetPassword";
import ProductDetails from "./Components/ProductDetails";
import Checkout from "./Components/Checkout";

function App() {
  return (
    <Router>
      <ShowNavbar>
        <Navbar />
      </ShowNavbar>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/forget-password" element={<ForgetPassword />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/checkout" element={<Checkout />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
