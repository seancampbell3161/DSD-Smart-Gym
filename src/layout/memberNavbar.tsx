import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/MemberNavbar.css';
import Logo from '../assets/SG_Icon2.png';

export interface MemberNavItem {
  label: string;
  to?: string;
  action?: 'logout';
}

interface MemberNavbarProps {
  navItems: MemberNavItem[];
}

const MemberNavbar: React.FC<MemberNavbarProps> = ({ navItems }) => {
  const navigate = useNavigate();

  const handleClick = (item: MemberNavItem) => {
    if (item.action === 'logout') {
      localStorage.removeItem('token');
      localStorage.removeItem('gym_id');
      navigate('/');
    }
  };

  return (
    <header className="member-navbar">
      <div className="member-navbar-container">
        {/* Left side: logo */}
        <div className="member-navbar-left">
          <img src={Logo} alt="Smart Gym logo" className="member-logo-img" />
        </div>

        {/* Right side: nav links */}
        <ul className="member-nav-links">
          {navItems.map((item, idx) => (
            <li key={idx}>
              {item.action === 'logout' ? (
                <button className="logout-button" onClick={() => handleClick(item)}>
                  {item.label}
                </button>
              ) : (
                <Link to={item.to!}>{item.label}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default MemberNavbar;
