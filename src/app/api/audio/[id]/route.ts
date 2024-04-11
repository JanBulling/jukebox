import { ApiError } from "@/utils/api/api-error";
import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

export const dynamic = "force-dynamic";

type Params = {
  params: { id: string };
};

export async function GET(response: NextResponse, { params }: Params) {
  try {
    const youtubeId = params.id;
    if (!youtubeId) return ApiError("BAD-REQUEST", "No youtube id given");

    const info = await ytdl.getInfo(youtubeId);

    const audioFormats = ytdl.filterFormats(info.formats, "audioonly");

    // lowest quality (see https://www.npmjs.com/package/ytdl-core#ytdlchooseformatformats-options)
    const format = ytdl.chooseFormat(
      audioFormats.length > 0 ? audioFormats : info.formats,
      {
        quality: "140",
      }
    );

    const downloadedData = ytdl.downloadFromInfo(info, { format: format });

    const responseHeaders = new Headers(response.headers);
    responseHeaders.set(
      "Content-Disposition",
      `attachment; filename="audio.mp3"`
    );
    responseHeaders.set("Accept-Ranges", "bytes");
    responseHeaders.set("Content-Type", "audio/mp4");
    responseHeaders.set("Content-Length", format.contentLength);

    return new Response(downloadedData as any, {
      headers: responseHeaders,
    });
  } catch (err) {
    console.error("[AUDIO/[id]]- GET", err);
    return ApiError("SERVER-ERROR", "Something went wrong");
  }
}
