import { send } from "micro";
import { NowRequest, NowResponse } from "@vercel/node";
import { setupResponse } from "./_lib/util/setup-response";

export default async function (
  request: NowRequest,
  response: NowResponse
): Promise<void> {
  let statusCode = 200;
  try {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Authorization, Accept, Content-Type"
    );
    if (request.method === "OPTIONS") {
      return send(response, statusCode);
    }
    send(response, statusCode, setupResponse("Hello World"));
    return;
  } catch (error) {
    statusCode = 400;
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    send(response, 400);
    return;
  }
}
