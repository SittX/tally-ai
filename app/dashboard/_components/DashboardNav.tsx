"use client";
import menus, { TMenu } from "@/lib/menus.config";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-screen z-10 absolute bottom-5">
      <div className="flex items-center justify-center max-w-xl mx-auto">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <XIcon size={24} className="transition-transform" />
          ) : (
            <MenuIcon size={24} className="transition-transform" />
          )}
        </button>
      </div>
      {isOpen && (
        <ul className="menu menu-lg bg-base-200 absolute mx-auto w-full rounded-md bottom-14 shadow-sm">
          {menus.map((menu: TMenu) => (
            <li key={menu.name}>
              <Link href={menu.herf}>{menu.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
