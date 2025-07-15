import React from "react";
import '../styles/MemberNavbar.css';
import Logo from '../assets/SG_Icon2.png';


const Navbar: React.FC = () => {
  return (
    <nav className="member-navbar">
      <div className="member-navbar-container">
        <div className="member-navbar-left">
          <img className="member-logo-img" src={Logo}/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;