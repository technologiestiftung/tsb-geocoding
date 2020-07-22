# @tsb/geocoding

OpenSource Geocoding Implementation used for [kita-suche.berlin](http://kita-suche.berlin/) (Berlin only)

Runs on vercel.com [geocoding.vercel.app](https://geocoding.vercel.app/)

## Usage

To lookup a street (e.g. "Platz der Luftbrücke") do the following.

```bash
curl "https://geocoding.vercel.app/street?street=platz%20der%20luftbr%C3%BCcke"
```

This will give you the following JSON.

```json
{
  "data": [
    {
      "id": 4454,
      "street": "Platz der Luftbrücke",
      "plz": 0
    }
  ]
}
```

Then use the obtained id to look up all house numbers.

```bash
curl "https://geocoding.vercel.app/num?street=4454"
```

```json
{
  "data": [
    {
      "num": "5",
      "id": 166607
    },
    {
      "num": "6",
      "id": 166608
    },
    {
      "num": "7",
      "id": 166609
    },
    {
      "num": "8",
      "id": 166610
    },
    {
      "num": "14",
      "id": 166898
    },
    {
      "num": "18",
      "id": 166903
    },
    {
      "num": "19",
      "id": 166904
    },
    {
      "num": "20",
      "id": 166905
    },
    {
      "num": "3",
      "id": 193081
    },
    {
      "num": "4",
      "id": 193082
    },
    {
      "num": "21",
      "id": 193086
    },
    {
      "num": "22",
      "id": 193087
    },
    {
      "num": "23",
      "id": 193088
    },
    {
      "num": "24",
      "id": 193096
    }
  ]
}
```

Select the house number you want and pass it as the num query parameter.  

```bash
curl "https://geocoding.vercel.app/geo?num=166608"
```

```json
{
  "data": {
    "lat": 52.50725,
    "lon": 13.35146
  }
}
```

You are done.

## Development

Development is done in Typescript. You will need:

- A vercel.com account
- vercel cli installed `npm i -g vercel`

In the root of the repo run:

```bash
vercel login
# first time deploy
vercel
# then to develop locally
vercel dev
# to deploy a new version
vercel --prod
```
