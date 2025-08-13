import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

interface NavItem { label: string; to: string; }
type Props = { navItems?: NavItem[] };

const NonMemberLayout: React.FC<Props> = ({ navItems }) => {
  return (
    <>
      <Navbar navItem={navItems ?? []} />
      <Outlet />
    </>
  );
};

export default NonMemberLayout;
