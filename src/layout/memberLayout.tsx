import React from 'react';
import MemberNavbar from './memberNavbar';

interface MemberLayoutProps {
  children: React.ReactNode;
}

const MemberLayout: React.FC<MemberLayoutProps> = ({ children }) => {
  const navItems = [
    { label: "Home", to: "/member" },
    { label: "Classes", to: "/member/classes" },
    { label: "Cafe", to: "/member/cafe-ordering" },
  ];

  return (
    <>
      <MemberNavbar navItems={navItems} />
      <main>{children}</main>
    </>
  );
};

export default MemberLayout;
