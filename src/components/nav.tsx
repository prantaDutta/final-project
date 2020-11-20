import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const links: linkArray[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "#", label: "Log Out" },
  { href: "/login", label: "Log In" },
  { href: "/register", label: "Register" },
];

interface linkArray {
  href: string;
  label: string;
}

// d attribute value of hambergur menu and cross sign
const menu = ["M4 6h16M4 12h16M4 18h16", "M6 18L18 6M6 6l12 12"];

interface NavItemsProps {
  links: linkArray[];
}

export default function Nav() {
  const { isAuthenticated } = useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // rendering each nav items
  const NavItems: React.FC<NavItemsProps> = ({ links }) => {
    return (
      <>
        {links.map((link, index) => {
          // not rendering item 5 & 6 when authenticated
          if (isAuthenticated && (index === 5 || index === 6)) return null;
          // not rendering item 3 & 4 when not authenticated
          else if (!isAuthenticated && (index === 3 || index === 4))
            return null;
          else if (link.label === "Log Out")
            return (
              <Link href={link.href} key={link.label}>
                <a
                  key={link.label}
                  onClick={() => localStorage.removeItem("authToken")}
                  className={`block font-semibold md:text-lg text-base rounded px-2 py-1 hover:bg-indigo-900 ${
                    index === 0 ? "" : "mt-1 md:mt-0 md:ml-2"
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            );
          else
            return (
              <Link href={link.href} key={link.label}>
                <a
                  key={link.label}
                  className={`block font-semibold md:text-lg text-base rounded px-2 py-1 hover:bg-indigo-900 ${
                    index === 0 ? "" : "mt-1 md:mt-0 md:ml-2"
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            );
        })}
      </>
    );
  };

  return (
    <div className="body-bg text-white md:flex md:justify-between md:items-center md:px-4 md:py-3">
      <div className="flex items-center justify-between px-4 py-3 md:p-0">
        <div className="tracking-widest md:text-lg text-base font-semibold uppercase md:ml-10 ">
          GrayScale
        </div>
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="md:hidden block text-gray-200 hover:text-white focus:text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={`${isDrawerOpen ? `${menu[1]}` : `${menu[0]}`}`}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`${
          isDrawerOpen ? "block" : "hidden"
        } px-2 pt-2 pb-4 uppercase md:flex md:p-0 lg:mr-8 md:ml-5`}
      >
        {/* Rendering every nav items from links array */}
        <NavItems links={links} />
      </div>
    </div>
  );
}
