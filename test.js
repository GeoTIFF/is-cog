const test = require("ava");
const fs = require("fs");
const isCOG = require("./is-cog");

test("identify jpg as not a cog", async t => {
  const buffer = fs.readFileSync("./data/flower.jpg");
  const { is_cog, is_geotiff, is_tiff } = isCOG({ data: buffer, debug: false });
  t.false(is_cog);
  t.false(is_geotiff);
  t.false(is_tiff);
});

test("identify normal tiff image as not a cog", t => {
  const buffer = fs.readFileSync("./data/flower.tif");
  const { is_cog, is_geotiff, is_tiff } = isCOG({ data: buffer, debug: false });
  t.true(is_tiff);
  t.false(is_cog);
  t.false(is_geotiff);
});

test("identify non-cog geotiff", t => {
  const buffer = fs.readFileSync("./data/geo.tif");
  const { is_cog, is_geotiff, is_tiff } = isCOG({ data: buffer, debug: false });
  t.true(is_tiff);
  t.true(is_geotiff);
  t.false(is_cog);
});

test("identify tiled COG", t => {
  const buffer = fs.readFileSync("./data/cog.tif");
  const { is_cog, is_geotiff, is_tiff } = isCOG({ data: buffer, debug: false });
  t.true(is_tiff);
  t.true(is_geotiff);
  t.true(is_cog);
});

test("identify Landsat 8 Scene", t => {
  const buffer = fs.readFileSync(
    "./data/LC08_L1TP_024030_20180723_20180731_01_T1_B4.TIF"
  );
  const { is_cog, is_geotiff, is_tiff } = isCOG({ data: buffer, debug: false });
  t.true(is_tiff);
  t.true(is_geotiff);
  t.true(is_cog);
});
