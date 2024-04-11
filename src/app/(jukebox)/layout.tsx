import BaseLayout from "@/layouts/base-layout";
import HorizontalCenteredLayout from "@/layouts/horizontal-centered-layout";

type Props = {
  children: React.ReactNode;
};

export default function JukeboxLayout({ children }: Props) {
  return (
    <BaseLayout>
      <HorizontalCenteredLayout>{children}</HorizontalCenteredLayout>
    </BaseLayout>
  );
}
