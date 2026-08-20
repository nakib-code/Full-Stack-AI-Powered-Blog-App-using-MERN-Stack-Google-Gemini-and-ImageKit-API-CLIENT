import React from "react";
import { LayoutDashboard, LogIn } from "lucide-react";

import { useAppContext } from "../context/AppContest";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <nav className="flex items-center justify-between px-4 py-4 sm:mx-20 sm:px-0 sm:py-5 xl:mx-32">
      <button
        onClick={() => navigate("/")}
        className="group flex cursor-pointer items-center gap-2.5"
      >
        {/* Logo Mark */}
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white shadow-sm transition-all duration-300 group-hover:scale-105 sm:h-10 sm:w-10">
          S
        </div>

        {/* Brand Name */}
        <div className="flex flex-col items-start leading-none">
          <span className="text-lg font-extrabold tracking-tight text-shadow-white sm:text-xl">
            SIMPLE<span className="text-primary">BLOG</span>
            <span className="text-primary">.</span>
          </span>
        </div>
      </button>

      {/* Dashboard / Login */}
      <button
        onClick={() => navigate("/admin")}
        title={token ? "Dashboard" : "Login"}
        aria-label={token ? "Dashboard" : "Login"}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-white transition-all hover:scale-105 hover:bg-primary/90 sm:h-auto sm:w-auto sm:gap-2 sm:px-6 sm:py-2.5"
      >
        {token ? (
          <LayoutDashboard className="h-4 w-4 sm:h-4 sm:w-4" />
        ) : (
          <LogIn className="h-4 w-4 sm:h-4 sm:w-4" />
        )}

        <span className="hidden text-sm sm:inline">
          {token ? "Dashboard" : "Login"}
        </span>
      </button>
    </nav>
  );
};

export default Navbar;