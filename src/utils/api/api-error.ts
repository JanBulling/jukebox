import { NextResponse } from "next/server";

export const STATUS_MAP = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  "NO-CONTENT": 204,
  "BAD-REQUEST": 400,
  UNAUTHORIZED: 401,
  "PAYMENT-REQUIRED": 402,
  FORBIDDEN: 403,
  "NOT-FOUND": 404,
  "NOT-ALLOWED": 405,
  "TOO-MANY-REQUESTS": 429,
  "SERVER-ERROR": 500,
  "NOT-IMPLEMENTED": 501,
  "SERVICE-UNAVAILABLE": 503,
} as const;

export type STATUS = keyof typeof STATUS_MAP;

export const ApiError = (status: number | STATUS, message: string) =>
  NextResponse.json(
    { error: message, status: status },
    {
      status: typeof status === "number" ? status : STATUS_MAP[status],
    }
  );

export const ApiErrorJson = (status: number | STATUS, message: string) =>
  NextResponse.json(
    { success: false, message: message, status: status },
    {
      status: typeof status === "number" ? status : STATUS_MAP[status],
    }
  );
