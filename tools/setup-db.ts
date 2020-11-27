import sqlite from "better-sqlite3";
import fs from "fs";
import path from "path";
import { csvParse } from "d3-dsv";
// const db = new sqlite(":memory:");
const dataFolder = path.resolve(__dirname, "../api/_data");
const db = new sqlite(`${dataFolder}/db.sqlite`);
export function setup() {
  db.prepare(
    `
  CREATE TABLE IF NOT EXISTS
    streets (id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, street text collate nocase, plz integer)
  `
  ).run();
  db.prepare(
    `
  CREATE TABLE IF NOT EXISTS
    streetnumbers (id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, street integer, num text, plz interger, lat float, lon float)
    `
  ).run();
  db.prepare(`TRUNCATE TABLE streets`).run();
  db.prepare(`TRUNCATE TABLE streetnumbers`).run();

  const streetsCsvfilePath = `${dataFolder}/streets.csv`; // path.resolve(__dirname, "../_data/streets.csv");
  const fileContent = fs.readFileSync(streetsCsvfilePath, "utf8");
  const streets = csvParse(fileContent);

  streets.forEach((row, i) => {
    if (row === undefined || row.plz === undefined) {
      return;
    }
    if (row.plz.includes("|")) {
      const arr = row.plz.split("|");

      arr.forEach((el) => {
        let plz = parseInt(el);

        if (isNaN(plz)) {
          plz = 0;
        }
        const params = [row.street, plz];
        db.prepare("INSERT INTO streets (street, plz) VALUES (?,?)").run(
          params
        );
      });
    } else {
      let plz = parseInt(row.plz);

      if (isNaN(plz)) {
        plz = 0;
      }

      const params = [row.street, plz];
      db.prepare("INSERT INTO streets (street, plz) VALUES (?,?)").run(params);
    }
  }); // end of streets looping
  const adddressFilePath = `${dataFolder}/address.min.csv`; //path.resolve(__dirname, "../_data/");
  const addressFileContent = fs.readFileSync(adddressFilePath, "utf8");
  const streetnumbers = csvParse(addressFileContent);

  streetnumbers.forEach((row, i) => {
    console.log("street number", i);
    const street = row.street ? parseInt(row.street) + 1 : 0;
    const hsnr = row.hsnr ? row.hsnr : "";
    const plz = row.plz ? parseInt(row.plz) : 10000;
    const lat = row.lat ? parseFloat(row.lat) : 52;
    const lon = row.lon ? parseFloat(row.lon) : 13;
    const params: [number, string, number, number, number] = [
      street,
      hsnr,
      plz,
      lon,
      lat,
    ];
    db.prepare(
      "INSERT INTO streetnumbers (street, num, plz, lat, lon) VALUES (?,?,?,?,?)"
    ).run(params);
  });
}

if (require.main === module) {
  setup();
  db.close();
}
