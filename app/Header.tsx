import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
function Header() {
  const session = true;

  if (session)
    return (
      <header className=" bg-yellow-50 sticky top-0 z-50 flex justify-between items-center p-7 shadow-sm">
        <div className="flex flex-col items-center space-y-5">
          <div className="flex space-x-2 items-center">
            <Image
              src="https://links.papareact.com/jne"
              height={10}
              width={50}
              alt="Profile Pic"
            />
            <div>
              <p className="text-blue-400">Logged in as</p>
              <p className="font-bold text-lg">Srijan Dubey</p>
            </div>
          </div>
        </div>
        <LogoutButton />
      </header>
    );
  return (
    <header className=" bg-black sticky top-0 z-50 flex justify-center items-center p-7 shadow-sm">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center">
          <Image
            src="https://links.papareact.com/jne"
            height={10}
            width={50}
            alt="logo"
          />
          <p className="text-blue-400">Welcome to Meta Messenger</p>
        </div>
        <Link
          href="/auth/signin"
          className=" bg-blue-500 hover:bg-blue-700 px-4 text-white py-2 rounded font-bold"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}

export default Header;
