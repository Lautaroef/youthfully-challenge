import type { NextApiRequest, NextApiResponse } from "next";
import cors from "cors";
import { corsOptions } from "app/utils/config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { section, sort, window, showViral } = req.query;

  const url = `https://api.imgur.com/3/gallery/${section}/${sort}/${window}/1?showViral=${showViral}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ACCESS_TOKEN}`,
    },
  });

  const data = await response.json();

  return cors(corsOptions)(req, res, () => {
    res.status(200).json(data);
  });
}
