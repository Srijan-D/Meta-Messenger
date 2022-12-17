"use client";
import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <button
      className=" bg-blue-500 hover:bg-blue-700 px-4 text-white py-2 rounded font-bold"
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </button>
  );
}

export default LogoutButton;
