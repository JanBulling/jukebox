"use client";

import { AnalysedBeat } from "@/lib/analysis/analyse-track-beats";
import { weightedIndex } from "@/utils/random-utils";
import { Button } from "@/ui/button";
import React, { useEffect } from "react";
import { Visualization } from "./visualization";
import { Icon, Loading } from "@/ui/icons";
import { useSearchParams } from "next/navigation";

type Props = {
  trackAnalysis: AnalysedBeat[];
  trackDurationSec: number;
  audioUrl: string;
  className?: string;
};

// even first jump is possible
let lastJump = 2;
const defaultTransitionTime = 0.1; // in sec

export function AudioPlayer({
  trackAnalysis,
  trackDurationSec,
  audioUrl,
  className,
}: Props) {
  const transitionTimeSearchParams = useSearchParams().get("transition");
  const transitionTime =
    typeof transitionTimeSearchParams === "string"
      ? Number(transitionTimeSearchParams)
      : defaultTransitionTime;

  const [audioCtx, setAudioCtx] = React.useState<AudioContext>();
  const [audioBuffer, setAudioBuffer] = React.useState<AudioBuffer>();
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [jumps, setJumps] = React.useState<number>(0);
  const [source, setSource] = React.useState<AudioBufferSourceNode>();
  const [timeoutIdx, setTimeoutIdx] = React.useState<NodeJS.Timeout>();

  useEffect(() => {
    //@ts-ignore
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioCtx(context);

    return () => {
      context.close();
    };
  }, []);

  useEffect(() => {
    if (!audioCtx) return;

    // Load audio buffer when component mounts
    loadAudio(audioUrl).then((buffer) => {
      setAudioBuffer(buffer);
    });
  }, [audioCtx, audioUrl]);

  const loadAudio = async (url: string) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await audioCtx!.decodeAudioData(arrayBuffer);
  };

  const playAudio = (start: number, duration: number) => {
    if (!audioCtx) return;
    const source = audioCtx.createBufferSource();
    const gainNode = audioCtx.createGain();

    source.buffer = audioBuffer!;
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // controling fading loudness in/out
    const beatDuration = duration + transitionTime;
    const fadeDuration = transitionTime; // maybe transitionTime/2 could be better
    const fadeInTime = audioCtx.currentTime;
    const fadeOutTime = fadeInTime + beatDuration - fadeDuration;

    gainNode.gain.setValueAtTime(0.5, fadeInTime);
    gainNode.gain.linearRampToValueAtTime(1, fadeInTime + fadeDuration);
    gainNode.gain.setValueAtTime(1, fadeOutTime);
    gainNode.gain.linearRampToValueAtTime(0.5, fadeOutTime + fadeDuration);

    source.start(0, start, beatDuration);
    return source;
  };

  const playBeat = (idx: number) => {
    const beat = trackAnalysis[idx];

    const source = playAudio(beat.start, beat.duration);
    if (!source) return;
    setSource(source);

    const timeout = setTimeout(() => {
      lastJump++;

      const nextBeatIdx = nextIndex(idx);
      setCurrentIndex((prev) =>
        prev === nextBeatIdx ? (prev + 1) % trackAnalysis.length : nextBeatIdx
      );
    }, beat.duration * 1000);

    setSource(source);
    setTimeoutIdx(timeout);

    source.onended = () => {
      source.disconnect();
    };
  };

  const nextIndex = (currIdx: number) => {
    lastJump += 1;

    // if a jump happened in the last 20 beats, return the next beat
    if (lastJump <= 2) {
      return (currIdx + 1) % trackAnalysis.length;
    }

    const beat = trackAnalysis[currIdx];

    // if no similar beats are available, return the next beat
    if (!beat.similars || beat.similars.length === 0) {
      return (currIdx + 1) % trackAnalysis.length;
    }

    const jumpProbability =
      0.85 / (1 + Math.exp((0.4 * trackDurationSec - beat.start) / 20));

    // return next beat, if no jump is selected
    if (Math.random() >= jumpProbability) {
      return (currIdx + 1) % trackAnalysis.length;
    }

    const jumpWeights = beat.similars.map((s) => s.conf);
    const randomIndex = weightedIndex(jumpWeights);

    setJumps((j) => j + 1);
    lastJump = 0;

    console.log(
      "Jumped (p=",
      jumpProbability,
      ") to index",
      beat.similars[randomIndex].idx
    );

    // return one after the index of a song part, which is similar
    // to the currently played
    return beat.similars[randomIndex].idx;
  };

  // looping in this useEffect, because of pausing and refreshing total beats,
  // time played and other stats
  useEffect(() => {
    if (isPlaying && audioCtx && audioBuffer && trackAnalysis.length > 0) {
      playBeat(currentIndex);
    }
  }, [audioCtx, audioBuffer, trackAnalysis, currentIndex, isPlaying]);

  return (
    <>
      <div className='mt-4'>
        <Button
          size='icon'
          variant='outline'
          disabled={audioBuffer === undefined}
          onClick={() => {
            setIsPlaying(!isPlaying);

            if (isPlaying) {
              clearTimeout(timeoutIdx);
              source?.stop();
            }
          }}
        >
          {audioBuffer === undefined ? (
            <Loading />
          ) : isPlaying ? (
            <Icon icon='Pause' />
          ) : (
            <Icon icon='Play' />
          )}
        </Button>
        <Button
          className='hidden'
          variant='destructive'
          onClick={() => {
            source?.stop();
            setIsPlaying(false);
          }}
        >
          CANCEL
        </Button>
        <p className='mt-2 text-sm'>{jumps} Jumps</p>
      </div>

      <Visualization
        trackAnalysis={trackAnalysis}
        trackDurationSec={trackDurationSec}
        currentIdx={currentIndex}
      />
    </>
  );
}
