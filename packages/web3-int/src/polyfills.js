import { Buffer } from "buffer";
import process from "process";
import * as util from "util";

if (typeof globalThis !== "undefined") {
  globalThis.Buffer = Buffer;
  globalThis.process = process;
  globalThis.util = util;
}
