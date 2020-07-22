import sqlite from "better-sqlite3";
import path from "path";
import { Street, HouseNumbers, GeoLocation } from "./commmon/interfaces";
const db = new sqlite(path.resolve(__dirname, "../_data/db.sqlite"));
export function getStreet(street: string): Street[] {
  const statement = "SELECT id,street,plz FROM streets WHERE street LIKE ?";
  const rows = db.prepare(statement).all(`${street}%`);
  return rows;
}
export function getStreetNumber(streetId: string): HouseNumbers[] {
  const rows = db
    .prepare("SELECT num,id FROM streetnumbers WHERE street = ?")
    .all([parseInt(streetId)]);
  return rows;
}
export function getGeoLocationOfHouseNumber(houseNumId: string): GeoLocation {
  const rows = db
    .prepare("SELECT lat,lon FROM streetnumbers WHERE id = ?")
    .get([parseInt(houseNumId)]);
  return rows;
}
