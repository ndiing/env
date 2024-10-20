<a name="module_env"></a>

## env

* [env](#module_env)
    * [~read([filename])](#module_env..read) ⇒ <code>string</code> \| <code>undefined</code>
    * [~write([filename], data)](#module_env..write)
    * [~parse(data, [callback])](#module_env..parse) ⇒ <code>Object</code>
    * [~stringify(data, options)](#module_env..stringify) ⇒ <code>string</code>
    * [~execute([filename], [options])](#module_env..execute)

<a name="module_env..read"></a>

### env~read([filename]) ⇒ <code>string</code> \| <code>undefined</code>
Membaca konten file dengan nama yang diberikan.
Secara default, ini membaca file ".env".

**Kind**: inner method of [<code>env</code>](#module_env)  
**Returns**: <code>string</code> \| <code>undefined</code> - - Konten file sebagai string, atau undefined jika terjadi kesalahan.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [filename] | <code>string</code> | <code>&quot;\&quot;.env\&quot;&quot;</code> | Nama file yang akan dibaca. |

<a name="module_env..write"></a>

### env~write([filename], data)
Menulis data ke dalam file yang diberikan.
Jika direktori tidak ada, direktori akan dibuat.

**Kind**: inner method of [<code>env</code>](#module_env)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [filename] | <code>string</code> | <code>&quot;\&quot;.env\&quot;&quot;</code> | Nama file yang akan ditulis. |
| data | <code>string</code> |  | Data yang akan ditulis ke dalam file. |

<a name="module_env..parse"></a>

### env~parse(data, [callback]) ⇒ <code>Object</code>
Mem-parsing data dari format string menjadi objek.
Menggunakan callback untuk setiap pasangan nama dan nilai.

**Kind**: inner method of [<code>env</code>](#module_env)  
**Returns**: <code>Object</code> - - Objek yang berisi pasangan nama dan nilai.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>string</code> |  | Data string yang akan diparsing. |
| [callback] | <code>function</code> | <code>(name, value) &#x3D;&gt; {}</code> | Callback yang dipanggil untuk setiap nama dan nilai. |

<a name="module_env..stringify"></a>

### env~stringify(data, options) ⇒ <code>string</code>
Mengonversi objek menjadi format string yang sesuai untuk file .env.

**Kind**: inner method of [<code>env</code>](#module_env)  
**Returns**: <code>string</code> - - Data yang telah diupdate sebagai string.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | Data string yang akan diupdate. |
| options | <code>Object</code> | Objek yang berisi pasangan nama dan nilai untuk di-stringify. |

<a name="module_env..execute"></a>

### env~execute([filename], [options])
Mengeksekusi proses membaca, mengupdate, dan menulis kembali file .env.
Juga mengatur variabel lingkungan dari file.

**Kind**: inner method of [<code>env</code>](#module_env)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [filename] | <code>string</code> | <code>&quot;\&quot;.env\&quot;&quot;</code> | Nama file yang akan diproses. |
| [options] | <code>Object</code> | <code>{}</code> | Opsi yang berisi pasangan nama dan nilai untuk diupdate. |

