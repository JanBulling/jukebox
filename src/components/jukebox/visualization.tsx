"use client";

import { AnalysedBeat } from "@/lib/analysis/analyse-track-beats";
import { cn } from "@/utils";
import React from "react";

type Props = {
  trackAnalysis: AnalysedBeat[];
  trackDurationSec: number;
  currentIdx: number;
  onSelected?: (idx: number) => void;
};

export function Visualization({
  trackAnalysis,
  trackDurationSec,
  currentIdx,
  onSelected,
}: Props) {
  const y = 50;

  return (
    <svg
      viewBox={`0 0 ${trackDurationSec * 2} ${y}`}
      className='w-full mt-8 max-w-3xl mx-auto'
    >
      {trackAnalysis.map((b, idx) => {
        const x1 = b.start * 2;
        const x2 = (b.start + b.duration) * 2;

        return (
          <React.Fragment key={idx}>
            {b.similars?.map((s, idx2) => {
              const resultBeat = trackAnalysis[s.idx];

              const xx2 = resultBeat.start * 2;
              const middle = (x2 + xx2) / 2;

              return (
                <path
                  key={idx * 100000 + idx2}
                  d={`M ${x2} ${y - 3} Q ${middle} -44 ${xx2} ${y - 3}`}
                  strokeWidth={2 * s.conf}
                  opacity={s.conf * 0.5}
                  fill='transparent'
                  className='stroke-accent'
                />
              );
            })}

            <line
              key={b.start}
              x1={x1 - 0.5}
              x2={x2 + 0.5}
              y1={y}
              y2={y}
              strokeWidth={6}
              className={cn(
                "stroke-gray-300 dark:stroke-gray-700",
                currentIdx === idx && "!stroke-destructive"
              )}
              // onClick={() => onSelected?.(idx)}
            />
          </React.Fragment>
        );
      })}
    </svg>
  );
}
