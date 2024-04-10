import { TrackAnalysis } from "@/types/spotify";
import { Segment } from "next/dist/server/app-render/types";

/**
 *
 * beats:
 *
 * [{
 *  start: number;
 *  duration: number;
 *  confidence: number;
 *  segments: [{
 *    start: number;
 *    duration: number;
 *    confidence: number;
 *    loudness_start: number;
 *    loudness_max: number;
 *    loudness_max_time: number;
 *    loudness_end: 0,
 *    pitches: number[];
 *    timbre: number[];
 *  },
 *  {
 *    ...
 *  }]
 * }]
 *
 * Aim: get the distance between two beats -> only take the highest ones
 *
 * totalDistance = sum / beats[i].segments.length ( + normalization );
 * if (totalDistance < threshold)
 *
 */

export type PreprocessedTrack = {
  start: number;
  duration: number;
  segments: Segment[];
};

/**
 *
 * @param analysis
 * @returns
 */
export function preprocessTrack(analysis: TrackAnalysis): PreprocessedTrack[] {
  const res = [];

  const beats = analysis.beats;
  const segments = analysis.segments;

  for (let i = 0; i < beats.length; i++) {
    const beatStart = beats[i].start;
    const beatEnd = beats[i].start + beats[i].duration;

    const overlappingSegments = [];

    // no need to always start from 0. One can start, around where the lasts search ended
    let lastIndex = 0;

    for (let j = lastIndex; j < segments.length; j++) {
      if (
        (segments[j].start >= beatStart && segments[j].start < beatEnd) ||
        (beatStart <= segments[j].start + segments[j].duration &&
          beatEnd >= segments[j].start + segments[j].duration)
      ) {
        overlappingSegments.push(segments[j]);

        // subtract 5 from the new starting point, because one segment can be part of different beats
        lastIndex = Math.max(0, j - 2);
      }

      if (segments[j].start > beatEnd) break;
    }

    res.push({
      ...beats[i],
      segments: overlappingSegments,
    });
  }

  return res;
}
