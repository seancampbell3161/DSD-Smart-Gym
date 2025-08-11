import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MemberNavbar.css';
import Logo from '../assets/SG_Icon2.png';

interface MemberNavItem {
  label: string;
  to: string;
}

interface MemberNavbarProps {
  navItems: MemberNavItem[];
}

const MemberNavbar: React.FC<MemberNavbarProps> = ({ navItems }) => {
  return (
    <header className="member-navbar">
      <div className="member-navbar-container">
        {/* Left side: logo + title */}
        <div className="member-navbar-left">
          <img src={Logo} alt="Smart Gym logo" className="member-logo-img" />
          {/* <span className="member-navbar-text">Member Portal</span> */}
        </div>

        {/* Right side: nav links */}
        <ul className="member-nav-links">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <Link to={item.to}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default MemberNavbar;
