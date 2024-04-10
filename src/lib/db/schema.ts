import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const accountsTable = pgTable(
  "accounts",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    username: varchar("username").unique().notNull(),
    password: text("password").notNull(),

    refreshToken: text("refresh_token"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return {
      emailIdx: uniqueIndex("username_idx").on(table.username),
    };
  }
);

export const sessionsTable = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),

  accountId: uuid("account_id")
    .notNull()
    .references(() => accountsTable.id),

  expiresIn: timestamp("expires_in").notNull(),
});

export const spotifyIdToYoutubeIdTable = pgTable("spotify_id_to_youtube_id", {
  spotifyId: varchar("spotify_id").primaryKey(),
  youtubeId: varchar("youtube_id").notNull(),
  songName: varchar("song_name"),
  artists: varchar("artists"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
