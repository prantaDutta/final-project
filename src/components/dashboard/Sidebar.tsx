interface SidebarProps {}
import { linkArray } from "./../shared/nav";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const router = useRouter();
  return (
    <div className="col-span-1 body-bg text-white">
      <Link href="/">
        <a>
          <h4 className="font-semibold text-4xl text-center mt-5">GrayScale</h4>
        </a>
      </Link>
      <div className="flex-col pt-10 uppercase">
        {links.map((link) => {
          return (
            <div
              className={`p-3 font-semibold text-base my-4 cursor-pointer border-l-4 border-solid hover:bg-grape hover:border-sage hover:text-skyblue ${
                router.pathname === link.href
                  ? "bg-grape border-sage text-skyblue"
                  : "border-grape"
              }`}
              key={link.label}
            >
              <Link href={link.href}>
                <a key={link.label}>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 inline-block mx-3 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d={link.svgD}
                      ></path>
                    </svg>
                    <span>{link.label}</span>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const links: linkArray[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    svgD:
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    href: "/curren-loans",
    label: "Current Loans",
    svgD:
      "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
  },
  {
    href: "/deposit",
    label: "Deposit",
    svgD: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
  },
  {
    href: "/withdraw",
    label: "Withdraw",
    svgD: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
  },
  {
    href: "/settings",
    label: "Settings",
    svgD:
      "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
  },
  {
    href: "/verification",
    label: "Verification",
    svgD:
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    href: "/contact-us",
    label: "Contact Us",
    svgD:
      "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
  },
];

export default Sidebar;
