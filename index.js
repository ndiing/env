const path = require("path");
const fs = require("fs");

/**
 * @module env
 */

/**
 * Membaca konten file dengan nama yang diberikan.
 * Secara default, ini membaca file ".env".
 *
 * @param {string} [filename=".env"] - Nama file yang akan dibaca.
 * @returns {string | undefined} - Konten file sebagai string, atau undefined jika terjadi kesalahan.
 */
function read(filename) {
    let data;
    try {
        data = fs.readFileSync(filename, { encoding: "utf8" });
    } catch (error) {}
    return data;
}

/**
 * Menulis data ke dalam file yang diberikan.
 * Jika direktori tidak ada, direktori akan dibuat.
 *
 * @param {string} [filename=".env"] - Nama file yang akan ditulis.
 * @param {string} data - Data yang akan ditulis ke dalam file.
 */
function write(filename, data) {
    let dirname = path.dirname(filename);
    try {
        fs.readdirSync(dirname);
    } catch (error) {
        fs.mkdirSync(dirname, { recursive: true });
    }
    fs.writeFileSync(filename, data);
}

/**
 * Mem-parsing data dari format string menjadi objek.
 * Menggunakan callback untuk setiap pasangan nama dan nilai.
 *
 * @param {string} data - Data string yang akan diparsing.
 * @param {function} [callback=(name, value) => {}] - Callback yang dipanggil untuk setiap nama dan nilai.
 * @returns {Object} - Objek yang berisi pasangan nama dan nilai.
 */
function parse(data, callback = (name, value) => {}) {
    let options = {};
    for (const [, name, value1, value2, value3, value4] of data.matchAll(/^([A-Z_]+)\s*=\s*(?:"([\s\S]+?)"|'([\s\S]+?)'|`([\s\S]+?)`|([\s\S]+?))\s*(?:#|\n|$)/gm)) {
        const value = value4 || value3 || value2 || value1;
        options[name] = value;
        callback(name, value);
    }
    return options;
}

/**
 * Mengonversi objek menjadi format string yang sesuai untuk file .env.
 *
 * @param {string} data - Data string yang akan diupdate.
 * @param {Object} options - Objek yang berisi pasangan nama dan nilai untuk di-stringify.
 * @returns {string} - Data yang telah diupdate sebagai string.
 */
function stringify(data, options) {
    const temp = options;
    for (const name in options) {
        let value = String(options[name]);
        const regex = new RegExp(`(${name})(\\s*=\\s*)(?:"([\\s\\S]+?)"|'([\\s\\S]+?)'|\`([\\s\\S]+?)\`|([\\s\\S]+?))(\\s*)(?:(#|\\n|$))`, "gm");

        if (regex.test(data)) {
            delete temp[name];
        }

        // data = data.replace(regex, ($, $name, $1, $value1, $value2, $value3, $value4, $2, $end) => {
        //     delete temp[name];
        //     const $value = $value4 || $value3 || $value2 || $value1;
        //     // console.log(value,$value)
        //     if ($value4) {
        //         value = `${value}`;
        //     } else if ($value3) {
        //         value = `\`${value}\``;
        //     } else if ($value2) {
        //         value = `'${value}'`;
        //     } else if ($value1) {
        //         value = `"${value}"`;
        //     }
        //     return `${name}${$1}${value}${$2}${$end}`;
        // });
    }
    const EOL = /(?!\n|^)$/.test(data);
    for (const name in temp) {
        const value = temp[name];
        data += `${EOL ? `\n` : ``}${name}=${value}\n`;
    }
    return data;
}

/**
 * Mengeksekusi proses membaca, mengupdate, dan menulis kembali file .env.
 * Juga mengatur variabel lingkungan dari file.
 *
 * @param {string} [filename=".env"] - Nama file yang akan diproses.
 * @param {Object} [options={}] - Opsi yang berisi pasangan nama dan nilai untuk diupdate.
 */
function execute(filename = ".env", options = {}) {
    filename = path.join(process.cwd(), filename);
    let data = read(filename) || "";
    data = stringify(data, options);
    write(filename, data);
    options = parse(data, (name, value) => {
        process.env[name] = value;
    });
    // console.log(options);
}

module.exports = execute;

// --env-file-if-exists
// --env-file-if-not-exists
// --env-file

// execute(".test.env", {
//     HTTP_PORT: 80,
//     HTTPS_PORT: 443,
//     HOSTNAME: "localhost",
//     HTTP_PROXY: "http://127.0.0.1:8888",
// });
