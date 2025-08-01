import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomepageNavBar.css";
import Logo from "../assets/SG_Icon2.png";

interface NavItem {
  label: string;
  to: string;
}

interface NavbarProps {
  navItem: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ navItem }) => {
  return (
    <nav className="public-navbar">
      <div className="public-navbar-container">
        <div className="public-navbar-left">
          <img className="homepage-logo" src={Logo} alt="Smart Gym Logo" />
        </div>
        <div className="public-navbar-right">
          <ul className="public-nav-menu">
            {navItem.map((item, index) => (
              <li key={index} className="public-nav-item">
                <Link to={item.to} className="public-nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
