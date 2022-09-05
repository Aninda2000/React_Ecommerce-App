import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const items = useSelector((state) => state.cart);
  return (
    <div>
      <div className="nav">
        <Link className="navLink" to="/">
          <h2>Ecommerce 🛒</h2>
        </Link>
        <Link className="navLink" to="/addproduct">
          <h4> Addproduct</h4>
        </Link>
        <Link className="navLink" to="/cart">
          <h4> Cart</h4>
        </Link>
        <h4 className="cartCount">Cart items: {items.length}</h4>
      </div>
    </div>
  );
};

export default Navbar;
