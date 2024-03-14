// Import Libray yg dibutuhkan
import { token } from "./cookies.js";

// header
var header = new Headers();
header.append("login", token);
header.append("apiKey", "AIzaSyA9lK3ZvoSraJ2mdL8ftOGsEjut6EngZ7s");
header.append("Content-Type", "application/json");

// Membuat objek konfigurasi untuk permintaan GET
export let requestOptionsGet = {
  method: 'GET',
  headers: header
}

// Endpoint Get All
export let UrlGetKey = "https://blogger.ulbi.ac.id/api/blog/key";
export let UrlGetAllPost = "https://blogger.ulbi.ac.id/api/blog/postprodi";
export let UrlGetAllBuku = "https://simbe-dev.ulbi.ac.id/api/v1/webometrics/buku";
export let UrlGetAllPublikasi = "https://simbe-dev.ulbi.ac.id/api/v1/webometrics/publikasi";
export let UrlGetRekapCitasiPublikasiPertahun = "https://simbe-dev.ulbi.ac.id/api/v1/webometrics/publikasi/rekapcitasi";
export let UrlGetRekapCitasiPublikasiPertahunByJenis = "https://simbe-dev.ulbi.ac.id/api/v1/webometrics/publikasi/citasijenistahun";