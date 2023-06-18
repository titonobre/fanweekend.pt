import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { mkdirp } from "mkdirp";
import sharp from "sharp";

/**
 *
 * @param {Buffer} input
 * @param {[width: number, height: number, path: string][]} outputs
 */
async function resize(input, outputs) {
  const inputStream = sharp(input);

  const promises = outputs.map((output) => inputStream.clone().resize(output[0], output[1]).png().toFile(join(outputDir, output[2])));

  await Promise.all(promises);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputFile = __dirname + "/../assets/images/pdcfw.svg";
const outputDir = __dirname + "/../src/app/(icons)";

await mkdirp(join(outputDir));

const inputBuffer = await sharp(inputFile)
  .resize(1000, 1000, { fit: "contain", background: "#000000" })
  .extend({
    top: 300,
    bottom: 300,
    left: 300,
    right: 300,
    background: "#000000",
  })
  .flatten({ background: "#000000" })
  .toBuffer();

await resize(inputBuffer, [
  [150, 150, "pdcfw.png"],
  [512, 512, "icon.png"],
  [192, 192, "icon-192.png"],
  [512, 512, "icon-512.png"],
  [180, 180, "apple-icon.png"],
]);
