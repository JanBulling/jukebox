"use client";

import { Button } from "@/ui/button";
import { Icon } from "@/ui/icons";
import { Link } from "@/ui/link";
import "@/styles/effects.css";
import NavBar from "@/components/common/nav-bar";
import Footer from "@/components/common/footer";

const GlobalErrorPage: React.FC<{ error: Error }> = ({ error }) => {
  console.error(error);

  return (
    <>
      <NavBar />

      <div className='glowingBackdrop' />

      <main className='flex flex-col gap-6 w-full min-w-0 items-center justify-center px-4 py-14 md:px-14 lg:px-28'>
        500
        <h1 className='text-5xl'>Internal server error</h1>
        <p className='max-w-sm text-center text-lg'>
          Something went wrong. The requested resource could not be delivered.
        </p>
        <Link href='/'>
          <Button>
            Back to home
            <Icon icon='ArrowRight' />
          </Button>
        </Link>
      </main>

      <Footer />
    </>
  );
};

export default GlobalErrorPage;
