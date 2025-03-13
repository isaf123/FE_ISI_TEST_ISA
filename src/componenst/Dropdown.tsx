"use client";
import { useState } from "react";
import { useUserList } from "@/queries/users";

interface DropdownButtonProps {
  value?: number;
  onChange: (value: number) => void;
}

export default function DropdownButton({
  value,
  onChange,
}: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const userList = useUserList();
  console.log(userList?.data);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: number) => {
    onChange(item);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {name || "pic"}
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul>
            {userList?.data.map(
              (item: { user_id: number; fullname: string }) => (
                <li
                  key={item.user_id}
                  onClick={() => {
                    handleItemClick(item.user_id);
                    setName(item.fullname);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {item.fullname}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
