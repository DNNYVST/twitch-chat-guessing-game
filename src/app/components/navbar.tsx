import Link from "next/link";

const Navbar = ({
  streamerMode,
}: {
  streamerMode: boolean;
  onClickTab: Function;
}) => {
  return (
    <nav
      role="navbar"
      className="flex justify-end mb-[1%] text-[#efeff1] text-sm font-medium"
    >
      <ul className="flex space-x-4">
        {/* <li
          className={`hover:cursor-pointer ${
            !streamerMode && "underline underline-offset-4 decoration-[#9147ff]"
          }`}
          onClick={() => onClickTab(false)}
        >
          Default View
        </li> */}
        <li className="hover:cursor-pointer underline underline-offset-4 decoration-[#9147ff] decoration-2">
          <Link href="/stream-view" target="_blank" rel="noopener noreferrer">
            Stream View (new tab)
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
