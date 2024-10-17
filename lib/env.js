const fs = require("fs");

/**
 * Memuat variabel lingkungan dari file .env.
 * Jika file tidak ada, file baru akan dibuat dengan konten kosong.
 * Variabel lingkungan yang ditemukan dalam file akan ditambahkan ke `process.env`.
 */
let env;

try {
    // Membaca konten file .env
    env = fs.readFileSync("./.env", { encoding: "utf8" });
} catch (error) {
    // Jika terjadi kesalahan (file tidak ada), buat file .env baru
    env = "";
    fs.writeFileSync("./.env", env);
}

// Mengurai dan menambahkan variabel lingkungan ke process.env
for (const [, name, value] of env.matchAll(/^\s*([A-Z0-9_]+)\s*=\s*([^\s#]+)/gm)) {
    process.env[name] = value;
}
