"use client";

import { Button } from "@/ui/button";
import { Icon } from "@/ui/icons";
import { Link } from "@/ui/link";

import "@/styles/effects.css";
import NavBar from "@/components/common/nav-bar";
import Footer from "@/components/common/footer";

export default function NotFound() {
  return (
    <div className='grid size-full grid-cols-[1fr] grid-rows-[auto_1fr_auto]'>
      <NavBar />

      <div className='glowingBackdrop' />

      <main className='flex flex-col gap-6 w-full min-w-0 items-center justify-center px-4 py-14 md:px-14 lg:px-28'>
        404
        <h1 className='text-5xl'>Not found</h1>
        <p className='max-w-sm text-center text-lg'>
          This page does not exist.
        </p>
        <Link href='/'>
          <Button>
            Back to home
            <Icon icon='ArrowRight' />
          </Button>
        </Link>
      </main>

      <Footer />
    </div>
  );
}
