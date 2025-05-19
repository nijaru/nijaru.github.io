/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Define the shape of import.meta.env
interface ImportMetaEnv {
  readonly PROD: boolean;
  readonly BASE_URL: string;
  readonly DEV: boolean;
  readonly MODE: string;
  readonly SSR: boolean;
  readonly SITE: string;
  readonly GITHUB_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}