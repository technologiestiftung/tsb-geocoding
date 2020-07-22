import index from "./index";
import * as micro from "micro";
import { setupTestRequest, setupTestResponse } from "./_data/__test_utils";
jest.mock("micro", () => {
  return { send: jest.fn() };
});
jest.mock("./_lib/util/setup-response");
describe("index testing", () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => {
    jest.restoreAllMocks();
  });
  test("should call micro", async () => {
    const req = setupTestRequest();
    const res = setupTestResponse({ setHeader: jest.fn() });
    await index(req, res);
    expect(micro.send).toHaveBeenCalledWith(res, 200, undefined);
  });
});
