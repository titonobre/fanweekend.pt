import { type MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fan Weekend",
    short_name: "Fan Weekend",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    theme_color: "#FFFFFF",
    background_color: "#FFFFFF",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      { src: "/icon-192.png", type: "image/png", sizes: "192x192", purpose: "any" },
      { src: "/icon-192.png", type: "image/png", sizes: "192x192", purpose: "maskable" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512", purpose: "any" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512", purpose: "maskable" },
    ],
  };
}
