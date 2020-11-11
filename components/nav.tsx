import { GetServerSideProps } from "next";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Log In" },
  { href: "/register", label: "Register" },
];

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

// bg-indigo-800

export default function Nav() {
  return (
    <div className="flex justify-between items-center p-5 body-bg text-white">
      <div className="ml-16">
        <h4 className="tracking-widest uppercase">GrayScale</h4>
      </div>
      <div className="mr-16">
        {links &&
          links.map((link) => {
            return (
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
