"use strict";

import { execFileSync } from "child_process";

import { PKG_CONFIG } from "./cli_vars.js";

/**
 * #  Library Class
 *
 *  This holds a single object of Library Type.
 *  Parameters:
 *  - `lib`: Library
 *  - `libname`: Library Name
 *  - `description`: Description
 */
export class Library {
  constructor(line) {
    const _vals = line.replace(/\s+/g, " ").split(" ");
    if (_vals.length < 2) {
      throw new TypeError("Line is not properly formatted.");
    }
    this.lib = _vals[0];
    this.libname = _vals[1];
    if (_vals.length > 3) {
      this.description = _vals.slice(3, _vals.length).join(" ");
    }
    // TODO: Able to implement it in a non-blocking way??
    // this.version = execFileSync(PKG_CONFIG.EXEC, [
    //   PKG_CONFIG.COMMANDS.MODVERSION,
    //   this.lib,
    // ])
    //   .toString()
    //   .trim();
  }

  get version() {
    return execFileSync(PKG_CONFIG.EXEC, [
      PKG_CONFIG.COMMANDS.MODVERSION,
      this.lib,
    ])
      .toString()
      .trim();
  }

  static listAll() {
    let libraries = [];
    let buffer = execFileSync(PKG_CONFIG.EXEC, [PKG_CONFIG.COMMANDS.LIST_ALL])
      .toString()
      .split("\n");
    for (let line of buffer.slice(0, buffer.length - 1)) {
      libraries.push(new Library(line));
    }
    return libraries;
  }
}
