# tsb-geocoding
OpenSource Geocoding Implementation (Berlin only)

## Dependencies: 


1. node-gyp
Follow the instructions on https://github.com/nodejs/node-gyp to install node-gyp:

```
npm install -g node-gyp
```

 - then add a binding.gyp file on root level:


```
{
  "targets": [
    {
      "target_name": "binding",
      "sources": [ "src/binding.cc" ]
    }
  ]
}
```

```
node-gyp configure [--python /path/to/python2.7]
node-gyp build [--python /path/to/python2.7]
```

2. Run:
```
npm install
```

3. OSRM:
Prepare OSRM Toolchain: https://github.com/Project-OSRM/osrm-backend/blob/master/docs/nodejs/api.md

for all three profiles (car, bicycle, foot): 

```
node_modules/osrm/lib/binding/osrm-extract data.osm.pbf -p node_modules/osrm/profiles/INSERT_PROFILE_HERE.lua
node_modules/osrm/lib/binding/osrm-contract data/INSERT_PROFILE_HERE/berlin-latest.osrm
```
