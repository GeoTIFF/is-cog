:warning: This package is under development.  Please report an issues here: https://github.com/geotiff/is-cog/issues
# is-cog
Super Light and Fast Method for Checking if a TIFF is a Cloud Optimized GeoTIFF

# how does it work
1. It uses [id-tif](https://github.com/DanielJDufour/id-tif) to check if the file is a TIFF. 
2. If it is a TIFF, it uses [is-geotiff](https://github.com/GeoTIFF/is-geotiff) to check if the file is a GeoTIFF.
3. If it is a GeoTIFF, it checks if the bytes associated with the following tags are present: TileWidth, TileLength, TileOffsets, and TileByteCounts.

# install
```bash
npm install is-cog
```

# usage
```js
const fs = require("fs");
const isCOG = require("is-cog");

const buffer = fs.readFileSync("./landsat_scene.tiff");

const { is_cog, is_geotiff, is_tiff } = isCOG({
    data: buffer,
    debug: false // set debug to true for increased logging
});
// is_cog is true
// is_geotiff is true
// is_tiff is true
```