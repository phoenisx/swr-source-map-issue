import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import webpack from "webpack";

export const __dirname = path.dirname(new URL(import.meta.url).pathname);
const envPath = path.resolve(__dirname, ".env");

class Cache {
  lastModified = 0;
  config = this.getConfig();
  getConfig() {
    const modifiedMs = fs.statSync(envPath).mtimeMs;
    if (this.lastModified !== modifiedMs) {
      this.config = dotenv.config({
        path: envPath,
      }).parsed;
      this.lastModified = modifiedMs;
      console.log("Reload Config: ", this.config);
    }
    return this.config;
  }
}

const cache = new Cache();

export const WebpackENVWithRuntime = Object.keys(cache.config)
  .filter(Object.prototype.hasOwnProperty.bind(cache.config))
  .reduce((pluginObj, key) => {
    pluginObj[`process.env.${key}`] = webpack.DefinePlugin.runtimeValue(
      () => JSON.stringify(cache.getConfig()[key]),
      {
        fileDependencies: [envPath],
      }
    );
    return pluginObj;
  }, {});

console.log(WebpackENVWithRuntime);
