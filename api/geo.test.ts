import geo from "./geo";
import * as micro from "micro";
import { setupTestRequest, setupTestResponse } from "./_data/__test_utils";
import * as db from "./_lib/db";
import { GeoLocation } from "./_lib/commmon/interfaces";
jest.mock("micro", () => {
  return { send: jest.fn() };
});
jest.mock("./_lib/util/setup-response");

describe("geo route testing", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("should call micro and getGeoLocationOfHouseNumber return 200", async () => {
    jest.spyOn(db, "getGeoLocationOfHouseNumber").mockImplementation((_num) => {
      return { lat: 13, lon: 52 };
    });
    const req = setupTestRequest({ query: { num: "1", street: "foo" } });
    const res = setupTestResponse({ setHeader: jest.fn() });
    await geo(req, res);
    expect(micro.send).toHaveBeenCalledWith(res, 200, undefined);
  });

  test("should call micro  return 400", async () => {
    jest.spyOn(db, "getGeoLocationOfHouseNumber").mockImplementation((_num) => {
      return { lat: 13, lon: 52 };
    });
    const req = setupTestRequest({ query: { street: "foo" } });
    const res = setupTestResponse({ setHeader: jest.fn() });
    await geo(req, res);
    expect(micro.send).toHaveBeenCalledWith(res, 400, {
      error: "invalid query. num query needs to be defined.",
    });
  });
  test("should call micro  return 400 due wrong num", async () => {
    jest.spyOn(db, "getGeoLocationOfHouseNumber").mockImplementation((_num) => {
      return { lat: 13, lon: 52 };
    });
    const req = setupTestRequest({ query: { num: [] } });
    const res = setupTestResponse({ setHeader: jest.fn() });
    await geo(req, res);
    expect(micro.send).toHaveBeenCalledWith(res, 400, {
      error: "num query needs to be of type string",
    });
  });
});
