
import { token } from "./cookies.js";
import { UrlGetKey } from "./template.js";

// Fungsi untuk mendapatkan API key dari backend
export async function getApiKey() {
    try {
        const response = await fetch(UrlGetKey, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'LOGIN': token,
            }
        });

        if (!response.ok) {
            throw new Error('Gagal mendapatkan API key');
        }

        const data = await response.json();

        if (data && data.data && data.data.apikey) {
            return data.data.apikey;
        } else {
            throw new Error('Tidak ada API key yang ditemukan dalam respons');
        }
    } catch (error) {
        throw new Error('Terjadi kesalahan:', error);
    }
}