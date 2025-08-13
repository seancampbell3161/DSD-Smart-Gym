import React from 'react';
import MemberNavbar from './memberNavbar';
import type { MemberNavItem } from './memberNavbar'; 

interface MemberLayoutProps {
  children: React.ReactNode;
}

const navItems: MemberNavItem[] = [
  { label: "Home", to: "/member" },
  { label: "Classes", to: "/member/classes" },
  { label: "Cafe", to: "/member/cafe-ordering" },
  { label: "Log Out", action: "logout" },
];

const MemberLayout: React.FC<MemberLayoutProps> = ({ children }) => {
  return (
    <>
      <MemberNavbar navItems={navItems} />
      <main>{children}</main>
    </>
  );
};

export default MemberLayout;
