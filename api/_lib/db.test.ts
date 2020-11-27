import { getStreet, getStreetNumber, getGeoLocationOfHouseNumber } from "./db";
describe("db tests", () => {
  test("getStreet request", () => {
    expect(getStreet("Platz der Luftbrücke")).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": 5082,
          "plz": 12101,
          "street": "Platz der Luftbrücke",
        },
      ]
    `);
  });

  test("getStreetNumber request", () => {
    expect(getStreetNumber("5082")).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": 162848,
          "num": "3",
        },
        Object {
          "id": 162975,
          "num": "1",
        },
        Object {
          "id": 166992,
          "num": "2",
        },
        Object {
          "id": 170646,
          "num": "4",
        },
        Object {
          "id": 171657,
          "num": "5",
        },
        Object {
          "id": 171923,
          "num": "6",
        },
      ]
    `);
  });

  test("getGeoLocationOfHouseNumber request", () => {
    expect(getGeoLocationOfHouseNumber("171923")).toMatchInlineSnapshot(`
      Object {
        "lat": 13.38691,
        "lon": 52.48299,
      }
    `);
  });
});
