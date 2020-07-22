import { getStreet, getStreetNumber, getGeoLocationOfHouseNumber } from "./db";
describe("db tests", () => {
  test("getStreet request", () => {
    expect(getStreet("Platz der Luftbrücke")).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": 4454,
          "plz": 0,
          "street": "Platz der Luftbrücke",
        },
      ]
    `);
  });

  test("getStreetNumber request", () => {
    expect(getStreetNumber("4454")).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": 166607,
          "num": "5",
        },
        Object {
          "id": 166608,
          "num": "6",
        },
        Object {
          "id": 166609,
          "num": "7",
        },
        Object {
          "id": 166610,
          "num": "8",
        },
        Object {
          "id": 166898,
          "num": "14",
        },
        Object {
          "id": 166903,
          "num": "18",
        },
        Object {
          "id": 166904,
          "num": "19",
        },
        Object {
          "id": 166905,
          "num": "20",
        },
        Object {
          "id": 193081,
          "num": "3",
        },
        Object {
          "id": 193082,
          "num": "4",
        },
        Object {
          "id": 193086,
          "num": "21",
        },
        Object {
          "id": 193087,
          "num": "22",
        },
        Object {
          "id": 193088,
          "num": "23",
        },
        Object {
          "id": 193096,
          "num": "24",
        },
      ]
    `);
  });

  test("getGeoLocationOfHouseNumber request", () => {
    expect(getGeoLocationOfHouseNumber("166608")).toMatchInlineSnapshot(`
      Object {
        "lat": 52.50725,
        "lon": 13.35146,
      }
    `);
  });
});
