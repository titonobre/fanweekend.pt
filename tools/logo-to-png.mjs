import { fileURLToPath } from "url";
import { dirname } from "path";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = __dirname + "/../assets/images/pdcfw-logo.svg";
const output = __dirname + "/../public/logo.png";

await sharp(input)
  .resize(140, 140, { fit: "contain", background: "#000000" })
  .extend({ top: 5, bottom: 5, left: 5, right: 5, background: "#000000" })
  .flatten({ background: "#000000" })
  .png()
  .toFile(output);
