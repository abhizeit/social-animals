import redis from "@/server/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      //limit only 2 requests in a window of 2 minutes
      limiter: Ratelimit.fixedWindow(2, "2 m"),
      analytics: true,
    })
  : undefined;
