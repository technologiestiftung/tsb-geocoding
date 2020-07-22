import { send } from "micro";

import { NowRequest, NowResponse } from "@vercel/node";
import { requestHandler } from "./_lib/request-handler";
import { RouteHandler } from "./_lib/commmon/types";
import { setupResponse } from "./_lib/util/setup-response";
import { getStreet } from "./_lib/db";
const routeHandler: RouteHandler = async (request, response) => {
  // try {
  const statusCode = 200;
  const { street } = request.query;
  if (street === undefined) {
    throw new Error("invalid query. street query needs to be defined.");
  }
  if (Array.isArray(street)) {
    throw new Error("street query needs to be of type string");
  }
  const rows = getStreet(street);
  const body = setupResponse(rows);
  send(response, statusCode, body);
};

/**
 * Route street
 *
 */
export default async function (
  request: NowRequest,
  response: NowResponse
): Promise<void> {
  await requestHandler(request, response, routeHandler);
}
