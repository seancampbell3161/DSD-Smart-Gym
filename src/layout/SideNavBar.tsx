import "../styles/SideNavBar.css";
import type { View } from "../types/AdminDashboard.interface";

interface SideNavBarProps {
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
}
const SideNavBar: React.FC<SideNavBarProps> = ({ view, setView }) => {
  const psuedoLinks = [
    "Analytics",
    "Account Management",
    "Class Management",
    "Inventory Management",
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLElement>) => {
    setView((e.target as HTMLElement).innerText as View);
  };
  return (
    <div className="side-nav-bar">
      <ul>
        {psuedoLinks.map((link) => (
          <li
            key={link}
            className={view === link ? "selected" : ""}
            onClick={handleLinkClick}
          >
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SideNavBar;
