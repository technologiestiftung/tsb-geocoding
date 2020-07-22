export interface Generic {
  [key: string]: unknown;
}

export interface Street {
  id: number;
  street: string;
  plz: number;
}
export interface HouseNumbers {
  num: string;
  id: number;
}
export interface GeoLocation {
  lat: number;
  lon: number;
}
