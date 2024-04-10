"use client";

import { Lyrics } from "@/types/lyrics";
import React from "react";

type Props = {
  lyrics: Lyrics[];
  audioUrl: string;
  className?: string;
};

export function Karaoke({ lyrics, audioUrl, className }: Props) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = React.useState<boolean>(false);

  const currentIdx = React.useRef<number>(-1);
  const [currentLyricIdx, setCurrentLyricIdx] = React.useState<number>(-1);

  const onUpdate = (event: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const timeSeconds = Math.round(event.currentTarget.currentTime);

    const nextIndex = (currentIdx.current + 1) % lyrics.length;
    const nextLyric = lyrics[nextIndex];

    if (timeSeconds === nextLyric.seconds) {
      currentIdx.current += 1;
      setCurrentLyricIdx(nextIndex);
    }
  };

  React.useEffect(() => {
    if (!playing) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
  }, [playing]);

  return (
    <div className='mt-4 w-full'>
      <audio
        ref={audioRef}
        controls
        controlsList='nodownload noplaybackrate'
        src={audioUrl}
        onTimeUpdate={onUpdate}
      />

      <div className='mt-8 w-full max-w-3xl'>
        <h1 className='text-4xl'>
          {currentLyricIdx >= 0 ? lyrics[currentLyricIdx].lyrics : ""}
        </h1>
        <h2 className='text-2xl mt-2 text-gray-700'>
          {currentLyricIdx < lyrics.length - 1
            ? lyrics[currentLyricIdx + 1].lyrics
            : ""}
        </h2>
      </div>
    </div>
  );
}
