# Portofolio Pribadi – Zafira Paras

Proyek UTS Pemrograman Web Dasar (semester 3).

## Identitas

- **Nama:** Zafira Paras
- **NIM:** `[isi NIM]`
- **Dosen:** Ditra Liandaputra, S.Kom., M.Kom
- **Tema yang dipilih:** C – Portofolio pribadi (sebagai calon web developer dan desainer UI)
- **Objek:** Diri sendiri (Zafira Paras)

## Daftar fitur

**Halaman (4 halaman, navigasi sama di semua halaman)**

| Halaman | Isi |
|---|---|
| `index.html` | Hero (judul, tagline, tombol ajakan), ringkasan, 3 karya unggulan |
| `tentang.html` | Profil + foto, visi/misi, tabel keahlian, 3 riwayat pendidikan |
| `katalog.html` | 6 kartu proyek (gambar, nama, deskripsi, kategori, tahun, alat) |
| `kontak.html` | Alamat dan media sosial, peta Google Maps, formulir kontak, tabel jam ketersediaan |

**HTML**
- `<!DOCTYPE html>`, `<meta charset>`, `<meta viewport>`, dan `<title>` berbeda di tiap halaman
- Elemen semantik: `header`, `nav`, `main`, `section`, `article`, `footer`, `figure`
- Dua tabel data dengan `thead` dan `tbody` (keahlian dan jam ketersediaan)
- Semua gambar memiliki `alt` yang bermakna
- Formulir: nama, email, nomor HP, `select` keperluan, dan `textarea` pesan, semuanya dengan `label for`/`id`
- Validasi HTML5: `required`, `type="email"`, `type="tel"` dengan `pattern="[0-9]{10,13}"`, serta `minlength`/`maxlength` pada pesan

**CSS (`css/style.css`, satu file eksternal)**
- Tanpa `style=""` inline dan tanpa tag `<style>`
- Flexbox untuk navigasi, header, dan footer; CSS grid untuk katalog
- Media query `max-width: 600px` (HP, katalog 1 kolom, menu vertikal di bawah logo) dan `min-width: 992px` (desktop)
- 13 variabel CSS di `:root` (`--warna-utama`, `--warna-krem`, dst.)
- Efek interaksi: `:hover` pada tombol, kartu, dan navigasi; `transition`; `@keyframes` (`naik` dan `mengambang`)
- Palet warna abu-abu dan cream

**JavaScript bonus (`js/script.js`, tanpa pustaka)**
1. Menu hamburger dengan `classList.toggle` di tampilan HP
2. Validasi formulir dengan pesan error di bawah kolom dan pesan sukses (tanpa `alert`)
3. Katalog dinamis: pencarian nama, filter kategori, dan urut (nama / tahun) dari array objek yang dirender ke DOM

Tanpa JavaScript, keempat halaman tetap berfungsi penuh: menu tampil vertikal di HP, kartu katalog sudah ada di HTML, dan formulir divalidasi oleh browser.

## Sumber gambar

Semua gambar (`img/*.svg`) adalah ilustrasi vektor buatan sendiri, tidak diambil dari situs lain. Font memakai Google Fonts (Inter dan Playfair Display).

## Kendala dan cara mengatasinya

- **Menu hamburger tidak boleh merusak versi tanpa JavaScript.** Solusinya, JavaScript menambahkan kelas `js` pada `<html>`; CSS hanya menyembunyikan menu dan menampilkan tombol bila kelas itu ada.
- **Katalog harus tetap tampil tanpa JavaScript, tetapi bonus meminta data dari array.** Kartu ditulis di HTML sebagai cadangan, lalu JavaScript menggantinya dengan kartu hasil render dari array `dataProyek`; kontrol filter disembunyikan dengan atribut `hidden` sampai JavaScript aktif.
- **Pesan validasi ganda (browser dan JavaScript).** Atribut HTML5 tetap dipertahankan; JavaScript hanya mengatur `form.noValidate = true` agar pesan tampil di bawah kolom, sehingga tanpa JavaScript browser tetap menolak input tidak valid.

## Cara menjalankan

Buka `index.html` di browser. Tidak perlu instalasi atau server.

## Struktur folder

```
nim-nama/
├── index.html
├── tentang.html
├── katalog.html
├── kontak.html
├── css/style.css
├── js/script.js
├── img/
├── bukti/        (tangkapan layar validasi W3C)
└── README.md
```
