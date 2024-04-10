/**
 * Neon.tech serverles implementation
 * using orm Drizzle
 *
 * Run push with:
 * pnpm drizzle-kit push:pg
 *
 * Run generate with
 * pnpm drizzle-kit generate:pg
 *
 * Edit data in ./drizzle.config.ts
 */

import { neon } from "@neondatabase/serverless";
import { drizzle as neon_drizzle } from "drizzle-orm/neon-http";

import { env } from "@/env.mjs";
import * as schema from "./schema";

const connection = neon(env.NEON_CONNECTION);
export const db = neon_drizzle(connection, { schema: schema });
