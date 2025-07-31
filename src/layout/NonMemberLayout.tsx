import React from 'react';
import Navbar from '../layout/navbar';

interface NonMemberLayoutProps {
  children: React.ReactNode;
}

const NonMemberLayout: React.FC<NonMemberLayoutProps> = ({ children }) => {
  const navItem = [
    { label: "Classes", to: "/nonmember/classes" } // ✅ also fix route spelling here
  ];

  return (
    <>
      <Navbar navItem={navItem} />
      <main style={{ paddingTop: "100px" }}>
        {children}
      </main>
    </>
  );
};

export default NonMemberLayout;
