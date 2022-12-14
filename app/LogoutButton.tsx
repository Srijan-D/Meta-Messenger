"use client"

function LogoutButton() {
  return (
    <button className=" bg-blue-500 hover:bg-blue-700 px-4 text-white py-2 rounded font-bold" 
    onClick={()=>{console.log("happy")}}>
      Sign out
    </button>
  );
}

export default LogoutButton;
