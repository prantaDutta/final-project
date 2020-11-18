import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const loggedInLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/api/logout", label: "Log Out", logout: true },
];

const loggedOutLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Log In" },
  { href: "/register", label: "Register" },
];

interface linkArray {
  href: string;
  label: string;
  logout?: boolean;
}

interface NavItemsProps {
  links: linkArray[];
}

const NavItems: React.FC<NavItemsProps> = ({ links }) => (
  <>
    {links.map((link) => {
      return link.logout ? (
        <Link href="#" key={link.label}>
          <a
            onClick={() => localStorage.removeItem("authToken")}
            key={link.label}
            className="p-2 pr-2 uppercase tracking-widest font-semibold hover:bg-indigo-900 hover:text-gray-400 rounded-md"
          >
            {link.label}
          </a>
        </Link>
      ) : (
        <Link href={link.href} key={link.label}>
          <a
            key={link.label}
            className="p-2 pr-2 uppercase tracking-widest font-semibold hover:bg-indigo-900 hover:text-gray-400 rounded-md"
          >
            {link.label}
          </a>
        </Link>
      );
    })}
  </>
);

export default function Nav() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="flex justify-between items-center p-5 body-bg text-white">
      <div className="ml-16 md:mr-10">
        <h4 className="tracking-widest uppercase">GrayScale</h4>
      </div>
      <div className="mr-16">
        {isAuthenticated ? (
          <NavItems links={loggedInLinks} />
        ) : (
          <NavItems links={loggedOutLinks} />
        )}
      </div>
      <style global jsx>
        {`
          .body-bg {
            background-color: #9921e8;
            background-image: linear-gradient(315deg, #9921e8 0%, #5f72be 50%);
          }
        `}
      </style>
    </div>
  );
}
