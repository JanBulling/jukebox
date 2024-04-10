"use client";

import { Button } from "@/ui/button";
import { Icon } from "@/ui/icons";
import { useTheme } from "next-themes";

const ThemeToggle: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleCurrentTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <Button
      variant='ghost'
      size='icon'
      aria-label='Toggle Theme'
      onClick={toggleCurrentTheme}
    >
      <Icon icon='Moon' className='block dark:hidden' />
      <Icon icon='Sun' className='hidden dark:block' />
    </Button>
  );
};

export default ThemeToggle;
