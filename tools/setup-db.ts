import sqlite from "better-sqlite3";
import fs from "fs";
import path from "path";
import { csvParse } from "d3-dsv";
// const db = new sqlite(":memory:");
const dataFolder = path.resolve(__dirname, "../api/_data");
const db = new sqlite(`${dataFolder}/db.sqlite`);
export function setup() {
  db.prepare(`DELETE FROM streets`).run();
  db.prepare(`DELETE FROM streetnumbers`).run();
  db.prepare(`DROP TABLE streets`).run();
  db.prepare(`DROP TABLE streetnumbers`).run();

  db.prepare(
    `
  CREATE TABLE IF NOT EXISTS
    streets (id TEXT, street TEXT, plz INTEGER)
  `
  ).run();
  db.prepare(
    `
  CREATE TABLE IF NOT EXISTS
    streetnumbers (id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, street TEXT, num TEXT, lat float, lon float)
    `
  ).run();

  const addressPath = `${dataFolder}/address.csv`; // path.resolve(__dirname, "../_data/streets.csv");
  const addressContent = fs.readFileSync(addressPath, "utf8");
  const streets = csvParse(addressContent);

  const streetsMap: {[key: string]: {[key: number]: [string, number]} } = {};

  let streetnumbersParams: (number | string)[] = [];
  let streetnumbersQuery = "";
  let street_id = 1;

  streets.forEach((row, i) => {
    // ignore addresses without housenr or postcode
    if (row.str_nr && parseInt(row.str_nr) > 0 && row.str_name && row.str_name.length > 0 && row.plz && row.plz.length > 0) {

      if (!(row.str_nr in streetsMap)) {
        streetsMap[row.str_nr] = {};
      }

      const plz = parseInt(row.plz);
      if (!(plz in streetsMap[row.str_nr])) {
        streetsMap[row.str_nr][plz] = [row.str_name, street_id];
        street_id += 1;
      }

      const str_nr = streetsMap[row.str_nr][plz][1];

      const param: (string | number)[] = [
        str_nr,
        (row.hnr + " " + row.hnr_zusatz).trim(),
        (row.X) ? parseFloat(parseFloat(row.X).toFixed(5)) : 0,
        (row.Y) ? parseFloat(parseFloat(row.Y).toFixed(5)) : 0,
      ];

      if (streetnumbersParams.length > 0) {
        streetnumbersQuery += ",";
      }
      streetnumbersQuery += "(?,?,?,?)";
      streetnumbersParams = streetnumbersParams.concat(param);
    }

    if (streetnumbersParams.length > 500) {
      console.log(streets.length, i);
      db.prepare(
        "INSERT INTO streetnumbers (street, num, lat, lon) VALUES " + streetnumbersQuery
      ).run(streetnumbersParams);
      streetnumbersQuery = "";
      streetnumbersParams = [];
    }
  });
  if (streetnumbersQuery.length > 0) {
    db.prepare(
      "INSERT INTO streetnumbers (street, num, lat, lon) VALUES " + streetnumbersQuery
    ).run(streetnumbersParams);
  }
  
  let streetsParams: (number | string | undefined)[] = [];
  let streetsQuery = "";

  for (let str_nr in streetsMap) {
    for (let plz in streetsMap[str_nr]) {
      const param = [
        streetsMap[str_nr][plz][1],
        streetsMap[str_nr][plz][0],
        plz
      ];
  
      if (streetsParams.length > 0) {
        streetsQuery += ",";
      }
      streetsQuery += "(?,?,?)";
      streetsParams = streetsParams.concat(param);
  
      if (streetsParams.length > 500) {
        db.prepare(
          "INSERT INTO streets (id, street, plz) VALUES  " + streetsQuery
        ).run(streetsParams);
        streetsQuery = "";
        streetsParams = [];
      }
  
    }
  }
  console.log("transmit streets");
  if (streetsQuery.length > 0) {
    db.prepare(
      "INSERT INTO streets (id, street, plz) VALUES  " + streetsQuery
    ).run(streetsParams);
  }
  console.log("done");
}

if (require.main === module) {
  setup();
  db.close();
}
