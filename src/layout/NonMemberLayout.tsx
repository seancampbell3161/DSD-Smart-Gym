import React from "react";
import Navbar from "./navbar";

interface NavItem {
  label: string;
  to: string;
}

interface NonMemberLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
}

const NonMemberLayout: React.FC<NonMemberLayoutProps> = ({
  children,
  navItems,
}) => {
  return (
    <>
      <Navbar navItem={navItems} />
      {children}
    </>
  );
};

export default NonMemberLayout;
