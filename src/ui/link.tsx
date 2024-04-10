import NextLink from "next/link";
// import { Link as LocalizedLink } from

type Props = Omit<React.ComponentProps<typeof NextLink>, "href"> & {
  href?: string;
};

export function Link({ children, href, ...props }: Props) {
  if (!href || href.toString().startsWith("http")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href?.toString()} {...props}>
      {children}
    </NextLink>
  );
}
