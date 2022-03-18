import { dirname, join } from "path";
import { fileURLToPath } from "url";

import mkdirp from "mkdirp";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputFile = __dirname + "/../assets/images/pdcfw-logo.svg";
const publicDir = __dirname + "/../public";

await mkdirp(join(publicDir, "icons"));

async function resize(input, outputs) {
  const inputStream = sharp(input);

  const promises = outputs.map((output) => inputStream.clone().resize(output[0], output[1]).png().toFile(join(publicDir, output[2])));

  await Promise.all(promises);
}

const inputBuffer = await sharp(inputFile)
  .resize(1000, 1000, { fit: "contain", background: "#000000" })
  .extend({ top: 300, bottom: 300, left: 300, right: 300, background: "#000000" })
  .flatten({ background: "#000000" })
  .toBuffer();

await resize(inputBuffer, [
  [150, 150, "logo.png"],
  [120, 120, "icons/logo-120.png"],
  [152, 152, "icons/logo-152.png"],
  [167, 167, "icons/logo-167.png"],
  [180, 180, "icons/logo-180.png"],
  [192, 192, "icons/logo-192.png"],
  [384, 384, "icons/logo-384.png"],
  [512, 512, "icons/logo-512.png"],
]);
