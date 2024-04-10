"use client";

import NavBar from "./common/nav-bar";

const navItems = [
  {
    link: "/jukebox",
    text: "Jukebox",
  },
  {
    link: "/karaoke",
    text: "Karaoke",
  },
];

const UseNavBar: React.FC = () => <NavBar navItems={navItems} />;

export default UseNavBar;
