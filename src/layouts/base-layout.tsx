import Footer from "@/components/common/footer";
import NavBar from "@/components/common/nav-bar";

const BaseLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className='grid size-full grid-cols-[1fr] grid-rows-[auto_1fr_auto]'>
    <NavBar />

    <main
      id='main-content'
      className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-14'
    >
      {children}
    </main>
    <Footer />
  </div>
);

export default BaseLayout;
