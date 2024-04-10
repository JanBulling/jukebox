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

  // only get the best jumps
  let maxSimilars = Array.from(
    result.flatMap((a) => (a.similars ? a.similars : []))
  )
    .sort((a, b) => b?.conf - a?.conf)
    .slice(0, maxJumps);

  // not ideal but good enought
  const limitedResults: AnalysedBeat[] = result.map((item) => {
    const newItem = { ...item };
    if (newItem.similars) {
      newItem.similars = newItem.similars.filter((s) =>
        maxSimilars.some((t) => t.idx === s.idx && t.conf === s.conf)
      );
    }
    return newItem;
  });

  // combine all sequential beats
  const jumpedTo = maxSimilars.map((b) => b.idx);
  const combined: AnalysedBeat[] = [];

  //                        oldIndex -> newIndex
  const newIndexMap = new Map<number, number>();

  for (let i = 0; i < limitedResults.length; i++) {
    const beat = limitedResults[i];

    let nextCertainIdx = limitedResults.length - 1;
    for (let j = i; j < limitedResults.length; j++) {
      if (
        jumpedTo.includes(j) ||
        (limitedResults[j].similars && limitedResults[j].similars!.length > 0)
      ) {
        // combined.push(limitedResults[j]);

        nextCertainIdx = j;
        break;
      }
    }

    const updatedBeat: AnalysedBeat = {
      start: beat.start,
      duration:
        limitedResults[nextCertainIdx].start +
        limitedResults[nextCertainIdx].duration -
        beat.start,
      similars: limitedResults[nextCertainIdx].similars,
    };
    combined.push(updatedBeat);

    newIndexMap.set(i, combined.length - 1);

    i = nextCertainIdx;
  }

  // console.log(newIndexMap);

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
