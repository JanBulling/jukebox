import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const spotifyIdToYoutubeIdTable = pgTable("spotify_id_to_youtube_id", {
  spotifyId: varchar("spotify_id").primaryKey(),
  youtubeId: varchar("youtube_id").notNull(),
  songName: varchar("song_name"),
  artists: varchar("artists"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
