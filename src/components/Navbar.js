import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const items = useSelector((state) => state.cart);
  return (
    <div>
      <div className="nav">
        <Link className="navLink" to="/">
          <h3>Home 🛒</h3>
        </Link>
        <Link className="navLink" to="/addproduct">
          <h3> Addproduct</h3>
        </Link>
        <Link className="navLink" to="/cart">
          <h3> Cart</h3>
        </Link>
        <h3 className="cartCount">Cart items: {items.length}</h3>
      </div>
    </div>
  );
};

export default Navbar;
