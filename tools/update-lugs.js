/* eslint-disable */
import assert from "node:assert";
import { writeFile } from "node:fs/promises";

import puppeteer from "puppeteer";

const url = "https://lan.lego.com/clubs/overview/";

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

await page.goto(url);

const data = await page.evaluate('document.querySelector("[data-ipsmap-markers]").getAttribute("data-ipsmap-markers")');

await browser.close();

assert(typeof data === "string" && data);

const markers = JSON.parse(data);

assert(typeof markers === "object" && markers);

const lugs = Object.values(markers)
  .map((marker) => marker.title)
  .toSorted((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

await writeFile("src/data/lugs.json", JSON.stringify(lugs, undefined, 2) + "\n");
