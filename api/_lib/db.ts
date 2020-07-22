import sqlite from "better-sqlite3";
import fs from "fs";
import path from "path";
import { csvParse } from "d3-dsv";
// const db = new sqlite(":memory:");
const db = new sqlite(path.resolve(__dirname, "../_data/db.sqlite"));

export function getStreet(street: string) {
  const statement = "SELECT id,street,plz FROM streets WHERE street LIKE ?";
  const rows = db.prepare(statement).all(`${street}%`);
  return rows;
}
