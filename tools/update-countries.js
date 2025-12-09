/* eslint-disable */
import assert from "node:assert";
import { writeFile } from "node:fs/promises";

import puppeteer from "puppeteer";

const url = "https://en.wikipedia.org/wiki/List_of_sovereign_states";

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

await page.goto(url);

const countries = await page.evaluate(
  'document.querySelectorAll("table.wikitable > tbody > tr > td:first-of-type b a").values().map(el => el.innerText).toArray()',
);

await browser.close();

assert(typeof countries === "object" && countries !== null && Array.isArray(countries), "Countries should be an array");

const lugs = countries.toSorted((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

await writeFile("src/data/countries.json", JSON.stringify(lugs, undefined, 2) + "\n");
