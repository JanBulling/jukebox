import UseNavBar from "@/components/use-nav-bar";
import UseFooter from "@/components/use-footer";
import BaseLayout from "@/layouts/base-layout";
import HorizontalCenteredLayout from "@/layouts/horizontal-centered-layout";

type Props = {
  children: React.ReactNode;
};

export default function JukeboxLayout({ children }: Props) {
  return (
    <BaseLayout>
      <UseNavBar />
      <HorizontalCenteredLayout>{children}</HorizontalCenteredLayout>
      <UseFooter />
    </BaseLayout>
  );
}
