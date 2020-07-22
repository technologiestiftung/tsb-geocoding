import { NowRequest, NowResponse } from "@vercel/node";

export type RouteHandler = (
  request: NowRequest,
  response: NowResponse
) => Promise<void>;
