"use client";

import { Icon } from "@/ui/icons";
import { Label } from "@/ui/input/label";
import React from "react";
import ThemeToggle from "./theme-toggle";
import NavItem from "../nav-item";
import { Button } from "@/ui/button";
import Logo from "@/components/logo";

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

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className='bg-white dark:border-gray-900 border-gray-200 dark:bg-gray-950 lg:flex lg:h-16 lg:items-center lg:flex-row lg:gap-8 lg:px-8 lg:border-b'>
      <div className='flex h-16 shrink-0 items-center px-4 lg:px-0 lg:h-full border-b lg:border-0 border-gray-200 dark:border-gray-900'>
        <Logo className='h-[30px] flex-1' />

        <Label
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className='block cursor-pointer lg:hidden'
          htmlFor='sidebarItemToggler'
        >
          {isMenuOpen ? <Icon icon='X' /> : <Icon icon='Menu' />}
        </Label>
      </div>

      <input className='peer hidden' id='sidebarItemToggler' type='checkbox' />

      <div className='hidden flex-1 flex-col lg:flex lg:flex-row lg:items-center peer-checked:flex'>
        <div className='flex flex-col lg:flex-row lg:flex-1 lg:p-0 p-4 gap-1 border-b border-gray-200 dark:border-gray-900 lg:border-0'>
          {navItems.map(({ text, link }) => (
            <NavItem key={link} href={link} allowSubPath>
              {text}
            </NavItem>
          ))}
        </div>

        <div className='flex items-center gap-2 p-4 lg:p-0 border-b border-gray-200 dark:border-gray-900 lg:border-0'>
          <ThemeToggle />

          <a
            target='_blank'
            href='https://github.com/JanBulling/jukebox'
            aria-label='Jan Bulling Github'
          >
            <Button variant='ghost' size='icon'>
              <Icon
                icon='Github'
                className='fill-gray-700 dark:fill-gray-300'
              />
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
