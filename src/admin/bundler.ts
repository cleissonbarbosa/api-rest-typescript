import { bundle } from "@adminjs/bundler";

/**
 * yarn admin:bundle invokes this script.
 * This file is used to bundle AdminJS files. It is used at compile time
 * to generate the frontend component bundles that are used in AdminJS.
 */
void (async () => {
  await bundle({
    customComponentsInitializationFilePath: "./src/admin/componentLoader.ts",
    destinationDir: "./.adminjs",
  });
})();