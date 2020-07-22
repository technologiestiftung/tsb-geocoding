import { getPackage } from "./package";
// import { Generic } from "../commmon/interfaces";
const pkg = getPackage();
// interface ServerResponse {
//   name: string;
//   version: string;
//   bugs?: { url: string };
//   homepage?: string;
//   data: unknown;
// }
export function setupResponse<T, U>(data: T, overrides?: U) {
  return {
    name: pkg.name,
    version: pkg.version,
    bugs: pkg.bugs,
    homepage: pkg.homepage,
    data,
    ...overrides,
  };
}
