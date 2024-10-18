const path = require("path");
const fs = require("fs");

/**
 * @module env
 */

/**
 * Membaca file .env dan mengatur variabel lingkungan (environment variables) ke dalam `process.env`.
 *
 * @memberof module:env
 * @param {string} [filename=".env"] - Nama file yang akan dibaca. Secara default, akan membaca ".env".
 * @throws {Error} - Melempar error jika terjadi kesalahan saat membaca file.
 */
function read(filename = ".env") {
    const env = fs.readFileSync(path.join(process.cwd(),filename), { encoding: "utf8" });

    for (const [, name, value1, value2, value3, value4] of env.matchAll(/([A-Z_]+)\s*=\s*(?:"([\s\S]+?)"|'([\s\S]+?)'|`([\s\S]+?)`|([\s\S]+?))\s*(?:#|\n|$)/g)) {
        const value = value4 || value3 || value2 || value1;
        process.env[name] = value;
    }
}

module.exports = read;
