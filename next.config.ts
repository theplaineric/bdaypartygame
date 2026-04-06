import type { NextConfig } from "next";

const explicitAppUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
const staticBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim().replace(/\/+$/, "") ?? "";

function getAllowedDevOrigins() {
  const defaults = ["localhost", "127.0.0.1", "local-origin.dev", "*.local-origin.dev"];

  if (!explicitAppUrl) return defaults;

  try {
    const { hostname } = new URL(explicitAppUrl);
    return Array.from(new Set([...defaults, hostname]));
  } catch {
    return defaults;
  }
}

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: getAllowedDevOrigins(),
  basePath: staticBasePath || undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      { hostname: "media.giphy.com" },
      { hostname: "media.tenor.com" },
      { hostname: "i.imgur.com" },
      { hostname: "*.giphy.com" },
    ],
  },
};

export default nextConfig;
