import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyDomReady, CihuyQuerySelector } from "https://c-craftjs.github.io/table/table.js";
import { UrlGetLatestPostUnit, requestOptionsGet } from "../controller/template.js";
import { token } from "../controller/cookies.js";

// Fungsi untuk mengonversi kode unit menjadi nama unit
function mapUnitCodeToName(unitCode) {
    switch (unitCode) {
        case '1':
            return 'Direktorat Teknologi Informasi (DTI)';
        case '2':
            return 'Direktorat RPIKK';
        case '3':
            return 'Direktorat PSMS';
        case '4':
            return 'Fakultas Logistik, Teknologi dan Bisnis (FLTB)';
        case '5':
            return 'Sekolah Vokasi';
        case '6':
            return 'Humas';
        case '7':
            return 'Lembaga Sertifikasi Profesi (LSP)';
        case '8':
            return 'Universitas Logistik dan Bisnis Internasional (ULBI)';
        default:
            return 'Unit Tidak Diketahui';
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
            const response = await fetch(UrlGetLatestPostUnit, await requestOptionsGet());
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

            // Mengonversi kode unit menjadi nama unit
            const unitName = mapUnitCodeToName(values.blog.unit);

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
            const timePartUpdated = dateObjUpdated.toLocaleTimeString('id-ID', {
                hour12: false
            });
            tableData += `
                <tr>
                    <td hidden></td>
                    <td style="text-align: center; vertical-align: middle">
                        <p class="fw-normal mb-1">${sequentialNumber}</p>
                    </td>
                    <td style="text-align: center; vertical-align: middle">
                        <p class="fw-normal mb-1">${formattedDateUpdated.replace('.', ',')}, <br>Pukul ${timePartUpdated} WIB</p>
                    </td>               
                    <td style="text-align: center; vertical-align: middle">
                        <p class="fw-normal mb-1">${unitName}</p>
                    </td>                             
                    <td style="text-align: center; vertical-align: middle">
                        <a href="${values.url}" target="_blank">${values.url}</a>
                    </td>                             
                    <td style="text-align: center; vertical-align: middle">
                        <p class="fw-normal mb-1">${values.title}</p>
                    </td>   
                    <td style="text-align: center; vertical-align: middle">
                        <a href="${values.author.url}" target="_blank">${values.author.displayName}</a>
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
