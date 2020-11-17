const idTIF = require("id-tif");
const isGeoTIFF = require("is-geotiff");
const hasBytes = require("has-bytes");

module.exports = function isCOG({ data, debug, is_geotiff, is_tiff }) {
  if (debug) console.log("[is-cog] starting with data", data);

  if (is_tiff === undefined) is_tiff = idTIF(data, debug);

  // return early if not a TIFF file
  if (!is_tiff) {
    if (debug) console.log("file is not a tiff, so returning early");
    return { is_cog: false, is_geotiff: false, is_tiff };
  }

  if (is_geotiff === undefined) is_geotiff = isGeoTIFF({ data, debug }).result;

  // return early if not a GeoTIFF file
  if (!is_geotiff) {
    if (debug) console.log("file is not a geotiff, so returning early");
    return { is_cog: false, is_geotiff, is_tiff };
  }

  const { result } = hasBytes({
    data,
    debug,
    sequences: {
      TileWidth: [66, 1], // 0x0142
      TileLength: [67, 1], // 0x0143
      TileOffsets: [68, 1], // 0x0144
      TileByteCounts: [69, 1] // 0x0145
    }
  });

  return { is_cog: result, is_geotiff, is_tiff };
};
