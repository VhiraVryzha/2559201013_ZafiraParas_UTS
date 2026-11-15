'use strict';

/* ==========================================================
   Portofolio Zafira Paras - script.js (fitur bonus)
   1. Menu hamburger
   2. Validasi formulir dengan pesan di bawah kolom
   3. Filter, pencarian, dan urut katalog dari array objek
   Tanpa JavaScript, semua halaman tetap berfungsi.
   ========================================================== */

// Menandai bahwa JavaScript aktif (dipakai CSS untuk menu hamburger)
document.documentElement.classList.add('js');

/* ---------- Data katalog ---------- */
const dataProyek = [
  {
    nama: 'Website Profil Warung Makan',
    deskripsi: 'Website statis empat halaman untuk warung makan keluarga, lengkap dengan daftar menu dan harga.',
    kategori: 'Web',
    tahun: 2026,
    alat: 'HTML, CSS',
    gambar: 'img/proyek-warung.svg',
    alt: 'Ilustrasi tampilan website warung makan dengan header, banner, dan tiga kartu menu'
  },
  {
    nama: 'Desain UI Aplikasi Catatan Belajar',
    deskripsi: 'Rancangan antarmuka aplikasi catatan kuliah dengan fokus pada tampilan bersih dan mudah dibaca.',
    kategori: 'Desain UI',
    tahun: 2026,
    alat: 'Figma',
    gambar: 'img/proyek-catatan.svg',
    alt: 'Ilustrasi layar ponsel berisi daftar catatan belajar'
  },
  {
    nama: 'Identitas Visual Laundry Kilau',
    deskripsi: 'Logo dan palet warna untuk usaha laundry kiloan agar tampil bersih dan mudah diingat.',
    kategori: 'Grafis',
    tahun: 2025,
    alat: 'Figma',
    gambar: 'img/proyek-logo.svg',
    alt: 'Ilustrasi logo laundry berbentuk lingkaran dengan tetesan air dan gelembung'
  },
  {
    nama: 'Landing Page Toko Kue Rumahan',
    deskripsi: 'Halaman tunggal responsif yang memperkenalkan produk kue dan cara memesan lewat pesan singkat.',
    kategori: 'Web',
    tahun: 2026,
    alat: 'HTML, CSS',
    gambar: 'img/proyek-kue.svg',
    alt: 'Ilustrasi landing page toko kue dengan gambar kue bertingkat di tengah'
  },
  {
    nama: 'Poster Seminar Teknologi Kampus',
    deskripsi: 'Poster satu halaman untuk seminar pengenalan dunia pemrograman bagi mahasiswa baru.',
    kategori: 'Grafis',
    tahun: 2025,
    alat: 'Canva',
    gambar: 'img/proyek-poster.svg',
    alt: 'Ilustrasi poster seminar dengan judul besar dan blok jadwal'
  },
  {
    nama: 'Prototipe Aplikasi Jadwal Kuliah',
    deskripsi: 'Prototipe interaktif untuk melihat jadwal kuliah harian dan pengingat tugas dalam satu layar.',
    kategori: 'Desain UI',
    tahun: 2026,
    alat: 'Figma',
    gambar: 'img/proyek-jadwal.svg',
    alt: 'Ilustrasi layar ponsel berisi kalender jadwal kuliah'
  }
];

/* ---------- 1. Menu hamburger ---------- */
function inisialisasiMenu() {
  const tombol = document.getElementById('tombol-menu');
  const menu = document.getElementById('menu-utama');
  if (!tombol || !menu) return;

  tombol.addEventListener('click', function () {
    const terbuka = menu.classList.toggle('terbuka');
    tombol.setAttribute('aria-expanded', String(terbuka));
  });
}

/* ---------- 2. Validasi formulir ---------- */
function ambilPesanError(kolom) {
  const label = document.querySelector('label[for="' + kolom.id + '"]').textContent;
  const nilai = kolom.value.trim();

  if (kolom.validity.valueMissing || nilai === '') {
    return label + ' wajib diisi.';
  }
  if (kolom.type === 'email' && kolom.validity.typeMismatch) {
    return 'Format email tidak valid, contoh: nama@email.com.';
  }
  if (kolom.type === 'tel' && kolom.validity.patternMismatch) {
    return 'Nomor HP harus berisi 10 sampai 13 digit angka.';
  }
  if (kolom.minLength > 0 && nilai.length < kolom.minLength) {
    return label + ' minimal ' + kolom.minLength + ' karakter.';
  }
  return '';
}

function tampilkanError(kolom, pesan) {
  const penampung = document.getElementById('error-' + kolom.id);
  const bungkus = kolom.closest('.kolom');
  if (penampung) penampung.textContent = pesan;
  if (bungkus) bungkus.classList.toggle('kolom-salah', pesan !== '');
  kolom.setAttribute('aria-invalid', pesan !== '' ? 'true' : 'false');
}

function validasiKolom(kolom) {
  const pesan = ambilPesanError(kolom);
  tampilkanError(kolom, pesan);
  return pesan === '';
}

function inisialisasiFormulir() {
  const form = document.getElementById('form-kontak');
  if (!form) return;

  const sukses = document.getElementById('pesan-sukses');
  const daftarKolom = Array.from(form.querySelectorAll('input, select, textarea'));

  // Matikan balon validasi bawaan browser, pesan tampil di bawah kolom
  form.noValidate = true;

  daftarKolom.forEach(function (kolom) {
    kolom.addEventListener('blur', function () {
      validasiKolom(kolom);
    });
    kolom.addEventListener('input', function () {
      if (kolom.getAttribute('aria-invalid') === 'true') validasiKolom(kolom);
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    sukses.hidden = true;

    let semuaValid = true;
    let kolomPertamaSalah = null;

    daftarKolom.forEach(function (kolom) {
      if (!validasiKolom(kolom)) {
        semuaValid = false;
        if (!kolomPertamaSalah) kolomPertamaSalah = kolom;
      }
    });

    if (!semuaValid) {
      kolomPertamaSalah.focus();
      return;
    }

    const nama = document.getElementById('nama').value.trim();
    sukses.textContent = 'Terima kasih, ' + nama + '! Pesan Anda sudah diterima dan akan saya balas secepatnya.';
    sukses.hidden = false;

    form.reset();
    daftarKolom.forEach(function (kolom) {
      tampilkanError(kolom, '');
      kolom.removeAttribute('aria-invalid');
    });
  });
}

/* ---------- 3. Katalog dinamis ---------- */
function buatKartu(proyek) {
  const kartu = document.createElement('article');
  kartu.className = 'kartu';

  const bungkusGambar = document.createElement('div');
  bungkusGambar.className = 'kartu-gambar';
  const gambar = document.createElement('img');
  gambar.src = proyek.gambar;
  gambar.alt = proyek.alt;
  gambar.width = 600;
  gambar.height = 400;
  gambar.loading = 'lazy';
  bungkusGambar.appendChild(gambar);

  const isi = document.createElement('div');
  isi.className = 'kartu-isi';

  const kategori = document.createElement('span');
  kategori.className = 'kategori';
  kategori.textContent = proyek.kategori;

  const judul = document.createElement('h2');
  judul.className = 'judul-kartu';
  judul.textContent = proyek.nama;

  const deskripsi = document.createElement('p');
  deskripsi.textContent = proyek.deskripsi;

  const meta = document.createElement('div');
  meta.className = 'kartu-meta';
  const tahun = document.createElement('span');
  tahun.textContent = proyek.tahun;
  const alat = document.createElement('span');
  alat.textContent = proyek.alat;
  meta.appendChild(tahun);
  meta.appendChild(alat);

  isi.appendChild(kategori);
  isi.appendChild(judul);
  isi.appendChild(deskripsi);
  isi.appendChild(meta);

  kartu.appendChild(bungkusGambar);
  kartu.appendChild(isi);
  return kartu;
}

function inisialisasiKatalog() {
  const daftar = document.getElementById('daftar-katalog');
  const kontrol = document.getElementById('kontrol-katalog');
  const jumlah = document.getElementById('jumlah-hasil');
  const kolomCari = document.getElementById('cari-proyek');
  const pilihKategori = document.getElementById('filter-kategori');
  const pilihUrut = document.getElementById('urut-proyek');
  if (!daftar || !kontrol || !kolomCari || !pilihKategori || !pilihUrut) return;

  function tampilkan() {
    const kataKunci = kolomCari.value.trim().toLowerCase();
    const kategori = pilihKategori.value;
    const urut = pilihUrut.value;

    const hasil = dataProyek.filter(function (proyek) {
      const cocokNama = proyek.nama.toLowerCase().includes(kataKunci);
      const cocokKategori = kategori === 'semua' || proyek.kategori === kategori;
      return cocokNama && cocokKategori;
    });

    if (urut === 'nama') {
      hasil.sort(function (a, b) { return a.nama.localeCompare(b.nama, 'id'); });
    } else if (urut === 'terbaru') {
      hasil.sort(function (a, b) { return b.tahun - a.tahun; });
    }

    daftar.replaceChildren();
    if (hasil.length === 0) {
      const kosong = document.createElement('p');
      kosong.className = 'kosong';
      kosong.textContent = 'Tidak ada proyek yang cocok dengan pencarian Anda.';
      daftar.appendChild(kosong);
    } else {
      hasil.forEach(function (proyek) {
        daftar.appendChild(buatKartu(proyek));
      });
    }

    jumlah.textContent = 'Menampilkan ' + hasil.length + ' dari ' + dataProyek.length + ' proyek.';
  }

  kolomCari.addEventListener('input', tampilkan);
  pilihKategori.addEventListener('change', tampilkan);
  pilihUrut.addEventListener('change', tampilkan);

  kontrol.hidden = false;
  jumlah.hidden = false;
  tampilkan();
}

/* ---------- Jalankan semua fitur ---------- */
document.addEventListener('DOMContentLoaded', function () {
  inisialisasiMenu();
  inisialisasiFormulir();
  inisialisasiKatalog();
});
