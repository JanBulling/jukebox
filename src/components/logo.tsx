import { cn } from "@/utils";
import { siteConfig } from "@/config/site-config";
import Link from "next/link";

type Props = React.HTMLAttributes<HTMLDivElement>;

export default function Logo({ className }: Props) {
  return (
    <Link href='/' className={cn("flex", className)}>
      <span className='text-primary-dark dark:text-primary-light sm:text-lg text-md'>
        Jan&apos;s
      </span>
      <span className='text-primary font-bold sm:text-xl text-lg'>Jukebox</span>
      <span className='sr-only'>{siteConfig.name}</span>
    </Link>
  );
}
