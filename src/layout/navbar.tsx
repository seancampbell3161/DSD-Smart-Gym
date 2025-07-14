import React from "react";

interface NavItem {
  label: string;
  to: string;
}

interface NavbarProps {
  navItems: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ navItems }) => {
  return (
    <nav>
      <ul>
        {navItems.map((item) => (
          <li key={item.to}>
            <a href={item.to}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;