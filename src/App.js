import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar, Products, Cart, Checkout } from "./components";
import { commerce } from "./lib/commerce";

import Signup from "./components/Auth/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./components/Auth/Dashboard";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/Auth/PrivateRoute";
import ForgotPassword from "./components/Auth/ForgotPassword";
import UpdateProfile from "./components/Auth/UpdateProfile";

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Router>
      <AuthProvider>
        <div style={{ display: "flex" }}>
          <CssBaseline />
          <Navbar
            totalItems={cart.total_items}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Switch>
            <Route exact path="/">
              <Products
                products={products}
                onAddToCart={handleAddToCart}
                handleUpdateCartQty
              />
            </Route>
            <PrivateRoute exact path="/cart">
              <Cart
                cart={cart}
                onUpdateCartQty={handleUpdateCartQty}
                onRemoveFromCart={handleRemoveFromCart}
                onEmptyCart={handleEmptyCart}
                component={cart}
              />
            </PrivateRoute>
            <Route path="/checkout" exact>
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />
            </Route>
            <PrivateRoute exact path="/Dashboard" component={Dashboard} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
