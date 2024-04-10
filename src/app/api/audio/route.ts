import { env } from "@/env.mjs";
import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";
import fs from "fs";
import { ApiError } from "@/utils/api/api-error";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, response: Response) {
  try {
    const youtubeId = request.nextUrl.searchParams.get("id");
    if (!youtubeId) return ApiError("BAD-REQUEST", "No youtube id given");

    const asFile =
      env.NODE_ENV !== "development"
        ? false
        : request.nextUrl.searchParams.get("as_file") ?? false;

    const info = await ytdl.getInfo(youtubeId);

    const audioFormats = ytdl.filterFormats(info.formats, "audioonly");

    // lowest quality (see https://www.npmjs.com/package/ytdl-core#ytdlchooseformatformats-options)
    const format = ytdl.chooseFormat(
      audioFormats.length > 0 ? audioFormats : info.formats,
      {
        quality: "140",
      }
    );

    if (asFile) {
      const outputFilePath = `./public/tmp/${info.videoDetails.title}.${format.container}`;
      const outputStream = fs.createWriteStream(outputFilePath);

      ytdl.downloadFromInfo(info, { format: format }).pipe(outputStream);

      return NextResponse.json({
        success: true,
        outputDir: outputFilePath,
        title: info.videoDetails.title,
        author: info.videoDetails.author,
        contentLength: format.contentLength,
      });
    }

    const downloadedData = ytdl.downloadFromInfo(info, { format: format });

    const responseHeaders = new Headers(response.headers);
    responseHeaders.set(
      "Content-Disposition",
      `attachment; filename="test.mp3"`
    );
    responseHeaders.set("Accept-Ranges", "bytes");
    responseHeaders.set("Content-Type", "audio/mp4");
    responseHeaders.set("Content-Length", format.contentLength);

    return new Response(downloadedData as any, {
      headers: responseHeaders,
    });
  } catch (err) {
    console.log("[AUDIO]- GET", err);
    return ApiError("SERVER-ERROR", "Something went wrong");
  }
}
