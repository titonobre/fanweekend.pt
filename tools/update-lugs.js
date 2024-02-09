/* eslint-disable */
import assert from "node:assert";

import * as cheerio from "cheerio";
import { writeFile } from "node:fs/promises";

const response = await fetch("https://lan.lego.com/clubs/overview/");

const html = await response.text();

const $ = cheerio.load(html);

const { markers } = $("#legoMap").data();

assert(typeof markers === "object" && markers);

const lugs = Object.values(markers)
  .map((marker) => marker.title)
  .toSorted((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

await writeFile("src/data/lugs.json", JSON.stringify(lugs, undefined, 2));
