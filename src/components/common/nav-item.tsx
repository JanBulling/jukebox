import { cn } from "@/utils";
import { Icon } from "@/ui/icons";
import { Link } from "@/ui/link";
import { usePathname } from "next/navigation";

type NavItemType = "nav" | "footer";

type Props = {
  href: string;
  type?: NavItemType;
  className?: string;
  allowSubPath?: boolean;
  target?: React.HTMLAttributeAnchorTarget | undefined;
};

const NavItem: React.FC<React.PropsWithChildren<Props>> = ({
  href = "",
  type = "nav",
  allowSubPath = false,
  children,
  className,
  target,
}) => {
  const pathname = usePathname();

  const isActive = allowSubPath
    ? pathname.startsWith(`/${href.toString().split("/")[1]}`)
    : href.toString() === pathname;

  return (
    <Link
      className={cn(
        "inline-flex items-center rounded gap-2 px-3 py-2",
        type === "footer" && "hover:bg-gray-100 hover:dark:bg-gray-900",
        isActive && "bg-primary",
        className
      )}
      href={href}
      target={target}
    >
      <span
        className={cn(
          "text-sm font-medium leading-5",
          type === "nav" && "text-gray-900 dark:text-white",
          type === "footer" && "text-gray-800 dark:text-white",
          isActive && "text-white"
        )}
      >
        {children}
      </span>

      {((type === "nav" && href.startsWith("http")) || target === "_blank") && (
        <Icon
          icon='ArrowUpRight'
          className={cn(
            "size-3 text-gray-500 dark:text-gray-200",
            isActive && "text-white opacity-50"
          )}
        />
      )}
    </Link>
  );
};

export default NavItem;
