import webExtensionDevelopment from "./calculator-configs/web-extension-development";
import { NewCalculator } from "../types";

type ConfigLibrary = ReadonlyArray<NewCalculator>;
const CONFIG_LIBRARY: ConfigLibrary = Object.freeze([webExtensionDevelopment]);

export class ConfigNotFoundError extends Error {
  constructor(slug: string) {
    super(`Configuration not found for slug: ${slug}`);
    this.name = "ConfigNotFoundError";
  }
}

export const findConfig = (slug: string): NewCalculator => {
  if (typeof slug !== "string" || slug.trim() === "") {
    throw new TypeError("Invalid slug: must be a non-empty string");
  }

  const config = CONFIG_LIBRARY.find(config => config.slug === slug);

  if (!config) {
    throw new ConfigNotFoundError(slug);
  }

  return { ...config }; // Return a shallow copy to prevent mutations
};
