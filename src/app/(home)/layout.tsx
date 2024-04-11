import BaseLayout from "@/layouts/base-layout";

type Props = {
  children: React.ReactNode;
};

export default async function HomeLayout({ children }: Props) {
  return <BaseLayout>{children}</BaseLayout>;
}
