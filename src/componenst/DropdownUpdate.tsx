"use client";
import { useState } from "react";
import { useUserList } from "@/queries/users";

export default function DropdownButtonUpdate() {
  const [isOpen, setIsOpen] = useState(false);

  const status = [
    { view: "not started", value: "not_started" },
    { view: "on progress", value: "on_progress" },
    { view: "done", value: "done" },
    { view: "reject", value: "reject" },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    console.log(item);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left hover:cursor-pointer">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-gray-700 text-white rounded-md "
      >
        update
      </button>
      {isOpen && (
        <div className="absolute z-20 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul>
            {status.map((item: { view: string; value: string }) => (
              <li
                key={item.view}
                onClick={() => {
                  handleItemClick(item.value);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {item.view}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
