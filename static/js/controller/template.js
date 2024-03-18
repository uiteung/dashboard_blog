// Import Libray yg dibutuhkan
import { token } from "./cookies.js";
import { getApiKey } from "./key.js";

// // header
// var header = new Headers();
// header.append("login", token);
// header.append("apiKey", "AIzaSyA9lK3ZvoSraJ2mdL8ftOGsEjut6EngZ7s");
// header.append("Content-Type", "application/json");

// // Membuat objek konfigurasi untuk permintaan GET
// export let requestOptionsGet = {
//   method: 'GET',
//   headers: header
// }

async function setHeaders() {
  try {
    const apiKey = await getApiKey();

    // Membuat objek header
    var header = new Headers();
    header.append("login", token);
    header.append("apiKey", apiKey);
    header.append("Content-Type", "application/json");

    return header;
  } catch (error) {
    console.error('Terjadi kesalahan saat mengatur header:', error);
    throw error;
  }
}

// Membuat objek konfigurasi untuk permintaan GET
export async function requestOptionsGet() {
  try {
    const header = await setHeaders();

    return {
      method: 'GET',
      headers: header
    };
  } catch (error) {
    console.error('Terjadi kesalahan saat membuat objek konfigurasi permintaan:', error);
    throw error;
  }
}

// Endpoint Get All
export let UrlGetKey = "https://blogger.ulbi.ac.id/api/blog/key";
export let UrlGetAllPost = "https://blogger.ulbi.ac.id/api/blog/postprodi";