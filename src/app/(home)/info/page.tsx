import { Badge } from "@/ui/badge";
import { Code } from "@/ui/code";

const spotifySearchCode = `const urlParameters = new URLSearchParams({
  q: q,
  type: "track"
}).toString();

const requestUrl = \`https://api.spotify.com/v1/search?\${urlParameters}\`;

await fetch(requestUrl, {
  method: "GET",
  headers: {
    Authorization: \`Bearer \${accessToken}\`,
    "Content-Type": "application/json",
  },
});`;

export default function InfoPage() {
  return (
    <>
      <h1 className='text-3xl md:text-5xl font-semibold'>
        How does the Jukebox work?
      </h1>

      <div className='flex flex-wrap mt-4 gap-2'>
        <h3 className='text-gray-700 font-semibold'>Build with:</h3>
        <Badge>Next.js</Badge>
        <Badge>Postgres</Badge>
        <Badge variant='accent'>Spotify Api</Badge>
        <Badge variant='accent'>Youtube Api</Badge>
        <Badge>Tailwind.css</Badge>
      </div>

      <h2 className='text-xl md:text-2xl font-semibold mt-12 text-gray-700 dark:text-gray-500'>
        1. Searching Songs
      </h2>
      <p>
        The searching of songs is done with the{" "}
        <a
          href='https://developer.spotify.com/documentation/web-api/reference/search'
          className='underline'
          target='_blanck'
        >
          Spotify Api
        </a>
        .
      </p>
      <Code lang='tsx'>{spotifySearchCode}</Code>

      <h2 className='text-xl md:text-2xl font-semibold mt-12 text-gray-700 dark:text-gray-500'>
        2. Generating jump-graph
      </h2>
      <ol className='list-decimal px-8'>
        <li>
          Retrieving base analysis data from the{" "}
          <a
            href='https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis'
            target='_blanck'
            className='underline'
          >
            Spotify-Api
          </a>{" "}
          including every beat (start time and duration) and segments, where the
          loudnes, pitches, timbre and the overall music is similar over a
          timeframe
        </li>
        <li>
          Connecting every beat to the (potentially multiple) segments, that
          take part during the beat
        </li>
        <li>
          Comparing all beats with each other to find similar ones. Here, the
          loudness, the pitches and the timbre of each segment is compared and a
          weighed sum determines the closeness of two beats.
        </li>
        <li>
          A graph is constructed where every beat is mapped to multiple other
          beats that are similar
        </li>
        <li>
          The graph is filtered and further processed for playing and jumping
        </li>
      </ol>

      <h2 className='text-xl md:text-2xl font-semibold mt-12 text-gray-700 dark:text-gray-500'>
        3. Getting the audio file
      </h2>
      <ol className='list-decimal px-8'>
        <li>
          Search youtube videos (using the YouTube-Api) with the same name as
          the song and the artist
        </li>
        <li>
          Filter these videos and find the one, where the video length matches
          the song length best
        </li>
        <li>Download the mp4 youtube video and extract the sound file</li>
      </ol>

      <h2 className='text-xl md:text-2xl font-semibold mt-12 text-gray-700 dark:text-gray-500'>
        4. Playing and jumping
      </h2>
      <p>
        Playing uses the browsers{" "}
        <a
          href='https://developer.mozilla.org/en-US/docs/Web/API/AudioContext'
          target='_blanck'
          className='underline'
        >
          AudioContext
        </a>{" "}
        for cross-browser support.
      </p>
    </>
  );
}
