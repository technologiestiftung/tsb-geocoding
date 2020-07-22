import { requestHandler } from "./request-handler";
import * as micro from "micro";
import { setupTestRequest, setupTestResponse } from "../_data/__test_utils";

jest.mock("micro", () => {
  return { send: jest.fn() };
});

describe("request-handler", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => {
    jest.restoreAllMocks();
  });
  test("should call route handler", async () => {
    const req = setupTestRequest();
    const res = setupTestResponse({ setHeader: jest.fn() });
    const routeHandler = jest.fn();
    await requestHandler(req, res, routeHandler);
    expect(routeHandler).toHaveBeenCalledWith(req, res);
  });
  test("should call micro", async () => {
    const req = setupTestRequest({ method: "OPTIONS" });
    const res = setupTestResponse({ setHeader: jest.fn() });
    const routeHandler = jest.fn();
    await requestHandler(req, res, routeHandler);
    expect(micro.send).toHaveBeenCalledWith(res, 200);
    expect(routeHandler).not.toHaveBeenCalled();
  });
  test("should call route handler", async () => {
    const req = setupTestRequest();
    const res = setupTestResponse({ setHeader: jest.fn() });
    const routeHandler = jest.fn().mockImplementation(() => {
      throw new Error("foo");
    });
    await requestHandler(req, res, routeHandler);
    expect(micro.send).toHaveBeenCalledWith(res, 400, { error: "foo" });
    expect(routeHandler).toHaveBeenCalled();
  });
});
