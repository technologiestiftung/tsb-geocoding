import { send } from "micro";

import { NowRequest, NowResponse } from "@vercel/node";
import { requestHandler } from "./_lib/request-handler";
import { RouteHandler } from "./_lib/commmon/types";
import { setupResponse } from "./_lib/util/setup-response";
import { getGeoLocationOfHouseNumber } from "./_lib/db";
const routeHandler: RouteHandler = async (request, response) => {
  // try {
  const statusCode = 200;
  const { num } = request.query;
  if (num === undefined) {
    throw new Error("invalid query. num query needs to be defined.");
  }
  if (Array.isArray(num)) {
    throw new Error("num query needs to be of type string");
  }
  const rows = getGeoLocationOfHouseNumber(num);
  const body = setupResponse(rows);
  send(response, statusCode, body);
};

/**
 * Route num. Takes an street id (not the name) optained from thhe street root and returns all house numbers wiith id
 *
 */
export default async function (
  request: NowRequest,
  response: NowResponse
): Promise<void> {
  await requestHandler(request, response, routeHandler);
}
