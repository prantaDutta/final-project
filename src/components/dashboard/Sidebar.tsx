import Link from "next/link";
import { useRouter } from "next/router";
import { sideBarLinks } from "../../utils/constantsArray";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const router = useRouter();
  return (
    <div className="col-span-1 bg-gray-100 text-gray-600">
      <Link href="/">
        <a>
          <h4 className="text-5xl font-bold tracking-wider text-center mt-5">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              GrayScale
            </span>
          </h4>
        </a>
      </Link>
      <div className="flex-col pt-10 uppercase">
        {sideBarLinks.map((link) => {
          return (
            <div
              className={`p-3 font-semibold text-base my-4 cursor-pointer border-l-4 border-solid hover:bg-primary hover:border-blue-400 hover:text-gray-100 ${
                router.pathname === link.href
                  ? "bg-primary border-blue-400 text-gray-100"
                  : "border-transparent"
              } transition duration-500 ease-in-out`}
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
                        strokeWidth="2"
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

export default Sidebar;
