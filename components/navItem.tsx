import React from "react";

interface NavItemProps {
  label: string;
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({ label, className }) => {
  return (
    <div
      className={`text-white cursor-pointer hover:text-gray-500 transition duration-500 ${className}`}
    >
      {label}
    </div>
  );
};

export default NavItem;
