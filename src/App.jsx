import { Toaster } from "react-hot-toast";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/auth/Login";
import Signup from "./Components/auth/Signup";
import ForgetPassword from "./Components/auth/ForgetPassword";
import Checkout from "./Components/Checkout";
import Protected from "./Components/auth/Protected";
import OrderSuccess from "./Components/OrderSuccess";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import PageNotFound from "./Components/PageNotFound";
import UserProfilePage from "./pages/UserProfilePage";
import Logout from "./Components/auth/Logout";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/*" element={<PageNotFound />} />
        <Route exact path="/product/:id" element={<ProductDetailsPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/forget-password" element={<ForgetPassword />} />

        <Route
          exact
          path="/cart"
          element={
            <Protected>
              <CartPage />
            </Protected>
          }
        />

        <Route
          exact
          path="/checkout"
          element={
            <Protected>
              <Checkout />
            </Protected>
          }
        />
        <Route
          exact
          path="/orders"
          element={
            <Protected>
              <UserOrdersPage />
            </Protected>
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <Protected>
              <UserProfilePage />
            </Protected>
          }
        />
        <Route exact path="/order-success/:id" element={<OrderSuccess />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
