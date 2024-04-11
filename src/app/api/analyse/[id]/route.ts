import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/utils/api/api-error";
import { getTrackAnalysis } from "@/lib/spotify/analysis";
import { preprocessTrack } from "@/lib/analysis/preprocess";
import { analysePreprocessedTrack } from "@/lib/analysis/analyse-track-beats";

export const dynamic = "force-dynamic";

type Params = {
  params: { id: string };
};

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const trackId = params.id;
    if (!trackId) return ApiError("BAD-REQUEST", "Track id is missing");

    let jumps = Number(request.nextUrl.searchParams.get("jumps") ?? 75);
    jumps = Math.max(0, Math.min(150, jumps));

    const analysis = await getTrackAnalysis(trackId);
    if (!analysis) return ApiError("SERVER-ERROR", "Could not analyse song");

    const preporcessed = preprocessTrack(analysis);
    const result = analysePreprocessedTrack(preporcessed, jumps);

    return NextResponse.json(result);
  } catch (err) {
    console.error("[ANALYSE/[id]]- GET", err);
    return ApiError("SERVER-ERROR", "Something went wrong");
  }
}
