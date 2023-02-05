import type { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: "https://youthfully-challenge-lautaro-figueroa.vercel.app/", // "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};
