import { NowRequest, NowResponse } from "@vercel/node";
import { Generic } from "../../_lib/commmon/interfaces";

export function setupTestRequest(overrides?: Generic): NowRequest {
  const req = {
    query: {},
    method: "GET",
    ...overrides,
  };
  return req as NowRequest;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setupTestResponse(overrides?: Generic): NowResponse {
  const res = {
    query: {},
    ...overrides,
  };
  return (res as unknown) as NowResponse;
}
