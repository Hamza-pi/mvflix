import React from "react";
import NavItem from "./navItem";

interface MobileMenuProps {
  visible?: boolean;
}

type MenuItems = {
  label: string;
  href?: string;
};

const menuItems: MenuItems[] = [
  {
    label: "Home",
  },
  {
    label: "Series",
  },
  {
    label: "Films",
  },
  {
    label: "New & Popular",
  },
  {
    label: "My List",
  },
  {
    label: "Browse by Languages",
  },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  return (
    <main
      className={`bg-black absolute top-8 left-8 w-52 border-2 border-gray-800 rounded transition duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col px-3 py-2">
        {menuItems.map((menuItem) => (
          <NavItem
            key={menuItem.label}
            label={menuItem.label}
            className="text-center hover:underline py-2 border-b border-gray-900"
          />
        ))}
      </div>
    </main>
  );
};

export default MobileMenu;
