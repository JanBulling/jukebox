import { Segment } from "next/dist/server/app-render/types";
import { PreprocessedTrack } from "./preprocess";

const minJumpLengthSeconds = 6;
const distanceThreshold = 80;

export type AnalysedBeat = {
  start: number;
  duration: number;
  similars?: {
    idx: number;
    conf: number;
  }[];
};

export function analysePreprocessedTrack(
  beats: PreprocessedTrack[],
  maxJumps = 75
) {
  const N = beats.length;

  const result = Array<AnalysedBeat>(N);

  for (let i = 0; i < N; i++) {
    const similars = [];

    const segs1 = beats[i].segments;

    for (let j = 0; j < N; j++) {
      if (i == j) continue;

      // only consider beats at least 5 seconds apart
      if (Math.abs(beats[j].start - beats[i].start) < minJumpLengthSeconds)
        continue;

      const segs2 = beats[j].segments;

      let sum = 0;

      for (let k = 0; k < segs1.length; k++) {
        let distance = 100;
        if (k < segs2.length) {
          if (segs1[k].start === segs2[k].start) {
            distance = 100;
          } else {
            distance = getSegmentDistance(segs1[k], segs2[k]);
          }
        }

        sum += distance;
      }

      const totalDistance = sum / segs1.length;
      if (totalDistance < distanceThreshold) {
        similars.push({
          idx: j,
          // t: beats[j].start,
          conf: 1 - totalDistance / distanceThreshold,
        });
      }
    }

    const similarBeats =
      similars.length > 0
        ? {
            similars: similars,
          }
        : undefined;

    result[i] = {
      start: beats[i].start,
      duration: beats[i].duration,
      ...similarBeats,
    };
  }

  const { top, jumpToIdxs } = filterTopResults(result, maxJumps);

  const combined = combineBeats(top, jumpToIdxs);

  return combined;
}

/**
 * filteres all analysed beats, so only the jumps with the highes probability stay
 *
 * @param beats analysed beats
 * @param maxJumps number of the maximum jumps in the resulted jump-graph
 * @returns new graph with only a maximum of `maxJumps` possible jumps and an array of all 'jumped-to' indexes
 */
function filterTopResults(beats: AnalysedBeat[], maxJumps: number) {
  // only get the best jumps
  let maxSimilars = Array.from(
    beats.flatMap((a) => (a.similars ? a.similars : []))
  )
    .sort((a, b) => b?.conf - a?.conf)
    .slice(0, maxJumps);

  // not ideal but good enought
  const limitedResults: AnalysedBeat[] = beats.map((item) => {
    const newItem = { ...item };
    if (newItem.similars) {
      newItem.similars = newItem.similars.filter((s) =>
        maxSimilars.some((t) => t.idx === s.idx && t.conf === s.conf)
      );
    }
    return newItem;
  });

  return {
    top: limitedResults,
    jumpToIdxs: maxSimilars.map((s) => s.idx),
  };
}

/**
 * combines as much beats as possible to one new and larger 'beat'
 *
 * @param beats analysed beats
 * @param jumpToIdxs array of indices, that are end points of jumps
 * @returns combined beats
 */
function combineBeats(beats: AnalysedBeat[], jumpToIdxs: number[]) {
  const combined: AnalysedBeat[] = [];

  //                        oldIndex -> newIndex
  const newIndexMap = new Map<number, number>();

  for (let i = 0; i < beats.length; i++) {
    const beat = beats[i];

    let nextCertainIdx = beats.length - 1;
    for (let j = i; j < beats.length; j++) {
      if (
        jumpToIdxs.includes(j) ||
        (beats[j].similars && beats[j].similars!.length > 0)
      ) {
        // combined.push(limitedResults[j]);

        nextCertainIdx = j;
        break;
      }
    }

    const updatedBeat: AnalysedBeat = {
      start: beat.start,
      duration:
        beats[nextCertainIdx].start +
        beats[nextCertainIdx].duration -
        beat.start,
      similars: beats[nextCertainIdx].similars,
    };
    combined.push(updatedBeat);

    newIndexMap.set(i, combined.length - 1);

    i = nextCertainIdx;
  }

  // restore new indexes in array
  combined.forEach((b) => {
    b.similars?.forEach((s) => {
      s.idx = newIndexMap.get(s.idx + 1) ?? 0;
    });
  });

  // make the first element always start at 0
  combined[0].duration = combined[0].duration + combined[0].start;
  combined[0].start = 0;

  return combined;
}

const timbreWeight = 1,
  pitchWeight = 10,
  loudStartWeight = 1,
  loudMaxWeight = 1,
  durationWeight = 100,
  confWeight = 1;

function getSegmentDistance(s1: Segment, s2: Segment) {
  const timbreDist = euclidianDistance(s1.timbre, s2.timbre);
  const pitchDist = euclidianDistance(s1.pitches, s2.pitches);
  const loudStartDist = Math.abs(s1.loudness_start - s2.loudness_start);
  const loudMaxDist = Math.abs(s1.loudness_max - s2.loudness_max);
  const durationDist = Math.abs(s1.duration - s2.duration);
  const confDist = Math.abs(s1.confidence - s2.confidence);

  const distance =
    timbreDist * timbreWeight +
    pitchDist * pitchWeight +
    loudStartDist * loudStartWeight +
    loudMaxDist * loudMaxWeight +
    durationDist * durationWeight +
    confDist * confWeight;

  return distance;
}

function euclidianDistance(arr1: number[], arr2: number[]) {
  const dist = arr1.reduce(
    (acc, val, i) => acc + Math.pow(val - arr2[i], 2),
    0
  );
  return Math.sqrt(dist);
}
