import React, { useState } from "react";
import {
  RiShoppingCartLine,
  RiHeart2Line,
  RiMenu2Line,
  RiCloseLine,
} from "react-icons/ri";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="h-[7vh] lg:h-[10vh] text-gray-400 py-4 px-10 flex items-center justify-between z-40">
      {/* Movile */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="lg:hidden text-2xl"
      >
        <RiMenu2Line />
      </button>
      <div
        className={`fixed left-0 bg-[#181A20] w-full h-full z-50 transition-all ${
          showMenu ? "top-0" : "-top-full"
        }`}
      >
        <button onClick={() => setShowMenu(!showMenu)} className="text-3xl p-4">
          <RiCloseLine />
        </button>
        <ul className="mt-20">
          <li>
            <a href="#" className="text-4xl block text-center p-4">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-4xl block text-center p-4">
              Companies
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-4xl text-[#E58D27] block p-4 text-center"
            >
              Game List
            </a>
          </li>
          <li>
            <a href="#" className="text-4xl block text-center p-4">
              Last Reviews
            </a>
          </li>
        </ul>
      </div>
      {/* Menu */}
      <ul className="hidden lg:flex items-center gap-6">
        <li>
          <a href="#" className="hover:text-[#E58D27] transition-colors">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-[#E58D27] transition-colors">
            Companies
          </a>
        </li>
        <li>
          <a href="#" className="text-[#E58D27] transition-colors">
            Game List
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-[#E58D27] transition-colors">
            Last Reviews
          </a>
        </li>
      </ul>
      {/* User menu */}
      <ul className="flex items-center gap-6 text-xl">
        <li>
          <button className="hover:text-[#E58D27] transition-colors">
            <RiHeart2Line />
          </button>
        </li>
        <li>
          <button>
            <img
              src="https://png.pngtree.com/png-vector/20191110/ourlarge/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
              className="w-8 h-8 object-cover rounded-full ring-2 ring-[#E58D27]"
            />
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
