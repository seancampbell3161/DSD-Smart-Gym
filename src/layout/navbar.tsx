import React from "react";
import '../styles/MemberNavbar.css';
import Logo from '../assets/SG_Icon2.png';

interface NavItem {
  label: string;
  to: string;
}

interface NavbarProps {
  navItems: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ navItems }) => {
  return (
    <nav className="member-navbar">
      <div className="member-navbar-container">
        <div className="member-navbar-left">
          <img className="member-logo-img" src={Logo}/>
        </div>
        <ul className="member-nav-links">
          {navItems.map((item) => (
            <li key={item.to}>
              <a href={item.to}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;