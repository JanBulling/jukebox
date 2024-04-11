import { Button } from "@/ui/button";
import "@/styles/effects.css";
import { Link } from "@/ui/link";

export default function Home() {
  return (
    <>
      <div className='glowingBackdrop' />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_2fr]'>
        <div>
          <h1 className='text-5xl'>Play Music Indefinitely</h1>
          <p className='text-lg mt-2'>
            The Jukebox lets you play your favorite songs without ever ending!
          </p>

          <div className='mt-6 md:max-w-md flex flex-col gap-4'>
            <Link href='/jukebox'>
              <Button className='w-full' variant='outline'>
                To the Jukebox
              </Button>
            </Link>
            <Link href='/karaoke'>
              <Button className='w-full' variant='outline'>
                Sing Karaoke
              </Button>
            </Link>
          </div>
        </div>

        <div></div>
      </div>
    </>
  );
}
