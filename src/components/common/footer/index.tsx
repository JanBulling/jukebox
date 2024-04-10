"use client";

import NavItem from "../nav-item";
import { Icon } from "@/ui/icons";

type Props = {
  navItems: Array<{
    text: string;
    link: string;
    target?: React.HTMLAttributeAnchorTarget | undefined;
  }>;
  socialLinks: Array<{
    icon: string;
    link: string;
    target?: React.HTMLAttributeAnchorTarget | undefined;
  }>;
};

const Footer: React.FC<Props> = ({ navItems, socialLinks }) => {
  return (
    <footer className='flex flex-col items-center gap-6 border-t border-gray-200 bg-white px-8 py-4 dark:border-gray-900 dark:bg-gray-950 md:flex-row md:justify-between md:py-5'>
      <div className='flex flex-wrap content-start items-center justify-center gap-1 self-stretch'>
        {navItems.map((item) => (
          <NavItem
            type='footer'
            href={item.link}
            target={item.target}
            key={item.link}
          >
            {item.text}
          </NavItem>
        ))}
      </div>

      <div className='flex-col md:flex-row items-center gap-1 md:flex hidden'>
        <NavItem
          type='footer'
          href='https://jan-bulling.com'
          target='_blank'
          className='whitespace-nowrap'
        >
          &copy; Jan Bulling
        </NavItem>

        <div className='flex items-center gap-1'>
          {socialLinks.map((link) => {
            return (
              <NavItem
                key={link.icon}
                href={link.link}
                target={link.target}
                type='footer'
              >
                {/* @ts-ignore */}
                <Icon icon={link.icon} aria-label={link.link} />
              </NavItem>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
