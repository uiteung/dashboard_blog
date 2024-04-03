import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyDomReady, CihuyQuerySelector } from "https://c-craftjs.github.io/table/table.js";
import { UrlGetLatestPostProdi, requestOptionsGet } from "../controller/template.js";
import { token } from "../controller/cookies.js";

// Fungsi untuk mengonversi kode prodi menjadi nama prodi
function mapProdiCodeToName(prodiCode) {
    switch (prodiCode) {
        case '14':
            return 'D4 Teknik Informatika';
        case '13':
            return 'D3 Teknik Informatika';
        case '23':
            return 'D3 Manajemen Informatika';
        case '33':
            return 'D3 Akuntansi';
        case '34':
            return 'D4 Akuntansi Keuangan';
        case '43':
            return 'D3 Manajemen Pemasaran';
        case '44':
            return 'D4 Manajemen Perusahaan';
        case '53':
            return 'D3 Administrasi Logistik';
        case '54':
            return 'D4 Logistik Bisnis';
        case '74':
            return 'D4 Logistik Niaga';
        case '81':
            return 'S1 Manajemen Transportasi';
        case '82':
            return 'S1 Manajemen Logistik';
        case '83':
            return 'S1 Bisnis Digital';
        case '84':
            return 'S1 Sains Data';
        case '85':
            return 'S1 Manajemen Rekayasa';
        case '11':
            return 'S2 Manajemen Logistik';
        
        default:
            return 'Prodi Tidak Diketahui';
    }
}

CihuyDomReady(async () => {
    const tablebody = CihuyId("tablebody");
    const buttonsebelumnya = CihuyId("prevPageBtn");
    const buttonselanjutnya = CihuyId("nextPageBtn");
    const halamansaatini = CihuyId("currentPage");
    const itemperpage = 10;
    let halamannow = 1;

    async function fetchData() {
        try {
            const response = await fetch(UrlGetLatestPostProdi, await requestOptionsGet());
            if (!response.ok) {
                throw new Error('Gagal mendapatkan data terbaru');
            }
            const data = await response.json();
            console.log(data);
            return data.data.items;
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            return []; // Mengembalikan array kosong jika terjadi kesalahan
        }
    }

    async function loadContent() {
        const items = await fetchData();

        // Memuat ulang tabel dengan data baru
        let tableData = "";
        items.forEach((values, index) => {
            const sequentialNumber = index + 1;

            // Mengonversi kode prodi menjadi nama prodi
            const prodiName = mapProdiCodeToName(values.blog.prodi);

            // Format the date
            const dateObjPublished = new Date(values.published);
            const dateObjUpdated = new Date(values.updated);
            const options = {
                day: 'numeric',
                month: 'long', // Use 'short' or 'long' for abbreviated or full month names
                year: 'numeric',
            };

            const formattedDatePublished = new Intl.DateTimeFormat('id-ID', options).format(dateObjPublished);
            const formattedDateUpdated = new Intl.DateTimeFormat('id-ID', options).format(dateObjUpdated);

            const timePartPublished = dateObjPublished.toLocaleTimeString('id-ID', {
                hour12: false
            });
            const timePartUpdated = dateObjPublished.toLocaleTimeString('id-ID', {
                hour12: false
            });
            tableData += `
                <tr>
                    <td hidden></td>
                    <td style="text-align: center; vertical-align: middle">
                        <p class="fw-normal mb-1">${sequentialNumber}</p>
                    </td>
                    <td style="text-align: center; vertical-align: middle">
                        <p class="fw-normal mb-1">${formattedDatePublished.replace('.', ',')}, <br>Pukul ${timePartPublished} WIB</p>
                    </td>               
                    <td style="text-align: center; vertical-align: middle">
                        <p class="fw-normal mb-1">${formattedDateUpdated.replace('.', ',')}, <br>Pukul ${timePartUpdated} WIB</p>
                    </td>               
                    <td style="text-align: center; vertical-align: middle">
                        <p class="fw-normal mb-1">${prodiName}</p>
                    </td>                             
                    <td style="text-align: center; vertical-align: middle">
                        <a href="${values.url}" target="_blank">${values.url}</a>
                    </td>                             
                    <td style="text-align: center; vertical-align: middle">
                        <p class="fw-normal mb-1">${values.title}</p>
                    </td>    
                    <td style="text-align: center; vertical-align: middle">
                        <p class="fw-normal mb-1">${values.author.displayName}</p>
                    </td>                                                       
                </tr>`;
        });

        document.getElementById("tablebody").innerHTML = tableData;

        displayData(halamannow);
        updatePagination();
    }

    function displayData(page) {
        const baris = CihuyQuerySelector("#tablebody tr");
        const mulaiindex = (page - 1) * itemperpage;
        const akhirindex = mulaiindex + itemperpage;

        for (let i = 0; i < baris.length; i++) {
            if (i >= mulaiindex && i < akhirindex) {
                baris[i].style.display = "table-row";
            } else {
                baris[i].style.display = "none";
            }
        }
    }

    function updatePagination() {
        halamansaatini.textContent = `Halaman ${halamannow}`;
    }

    buttonsebelumnya.addEventListener("click", () => {
        if (halamannow > 1) {
            halamannow--;
            displayData(halamannow);
            updatePagination();
        }
    });

    buttonselanjutnya.addEventListener("click", () => {
        const totalPages = Math.ceil(
            tablebody.querySelectorAll("#tablebody tr").length / itemperpage
        );
        if (halamannow < totalPages) {
            halamannow++;
            displayData(halamannow);
            updatePagination();
        }
    });

    // Memuat konten saat halaman dimuat
    loadContent();
});
