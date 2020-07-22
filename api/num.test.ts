import num from "./num";
import * as micro from "micro";
import { setupTestRequest, setupTestResponse } from "./_data/__test_utils";
import * as db from "./_lib/db";
import {} from "./_lib/commmon/interfaces";
jest.mock("micro", () => {
  return { send: jest.fn() };
});
jest.mock("./_lib/util/setup-response");

describe("num route testing", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("should call micro and getStreetNumber return 200", async () => {
    jest.spyOn(db, "getStreetNumber").mockImplementation(() => {
      return [{ id: 13, num: "foo" }];
    });
    const req = setupTestRequest({ query: { street: "foo" } });
    const res = setupTestResponse({ setHeader: jest.fn() });
    await num(req, res);
    expect(micro.send).toHaveBeenCalledWith(res, 200, undefined);
  });

  test("should call micro return 400", async () => {
    jest.spyOn(db, "getStreetNumber").mockImplementation(() => {
      return [{ id: 13, num: "foo" }];
    });
    const req = setupTestRequest({ query: { foo: "1" } });
    const res = setupTestResponse({ setHeader: jest.fn() });
    await num(req, res);
    expect(micro.send).toHaveBeenCalledWith(res, 400, {
      error: "invalid query. street query needs to be defined.",
    });
  });

  test("should call micro  return 400 due to wrong num", async () => {
    jest.spyOn(db, "getStreetNumber").mockImplementation((_num) => {
      return [{ id: 13, num: "foo" }];
    });
    const req = setupTestRequest({ query: { street: [] } });
    const res = setupTestResponse({ setHeader: jest.fn() });
    await num(req, res);
    expect(micro.send).toHaveBeenCalledWith(res, 400, {
      error: "street query needs to be of type string",
    });
  });
});
