import UseFooter from "@/components/use-footer";
import UseNavBar from "@/components/use-nav-bar";
import BaseLayout from "@/layouts/base-layout";

type Props = {
  children: React.ReactNode;
};

export default async function HomeLayout({ children }: Props) {
  return (
    <BaseLayout>
      <UseNavBar />

      <main
        id='main-content'
        className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
      >
        {children}
      </main>

      <UseFooter />
    </BaseLayout>
  );
}
