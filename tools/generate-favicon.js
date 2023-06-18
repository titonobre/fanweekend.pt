import sharp from "sharp";
import { sharpsToIco } from "sharp-ico";

// sizes options
await sharpsToIco([sharp("assets/images/favicon.svg").resize(256, 256)], "src/app/favicon.ico");
