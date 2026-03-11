import type { NextConfig } from "next";

const repoName = "danush-portfolio";
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGitHubPagesBuild ? `/${repoName}` : "",
  assetPrefix: isGitHubPagesBuild ? `/${repoName}/` : undefined,
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
