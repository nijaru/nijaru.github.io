/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Define the shape of import.meta.env
interface ImportMetaEnv {
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}