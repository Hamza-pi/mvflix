import Image from "next/image";
import React, { useCallback, useState } from "react";
import NavItem from "./navItem";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import MobileMenu from "./mobileMenu";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className="
        px-4
        2xl:py-16
        py-6
        flex
        items-center
        transition
        duration-500
        bg-zinc-900
        bg-opacity-90
      "
      >
        <Image height={75} width={189} src="/images/logo.png" alt="Logo" />
        <div className="hidden lg:flex items-center gap-7 pl-8 ">
          <NavItem label="Home" />
          <NavItem label="Series" />
          <NavItem label="Films" />
          <NavItem label="New & Popular" />
          <NavItem label="My List" />
          <NavItem label="Browse by Languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="
          flex 
          lg:hidden
          items-center 
          gap-2 
          pl-8 
          cursor-pointer 
          text-white 
          relative 
          transition 
          duration-500 
        "
        >
          <p>Browse</p>
          <BsChevronDown />
          <MobileMenu visible={showMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <BsSearch className="cursor-pointer text-white transition duration-500 hover:text-gray-500" />
          <BsBell className="cursor-pointer text-white transition duration-500 hover:text-gray-500" />
          <div className="flex items-center gap-3 relative">
            <Image
              height={30}
              width={30}
              src="/images/profile.jpg"
              alt="Profile Pic"
              className="rounded"
            />
            <BsChevronDown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
