"use client";
import { SquareMenu } from "lucide-react";
import { useState } from "react";

export default function DashboardNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-screen z-10 absolute bottom-5">
      <div className="flex items-center justify-center w-20 mx-auto border border-white">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <SquareMenu size={24} />
        </button>
      </div>
      {isOpen && (
        <ul className="menu bg-base-200 border border-white absolute w-screen bottom-10">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      )}
    </nav>
  );
}
