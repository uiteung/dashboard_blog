import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyDomReady, CihuyQuerySelector } from "https://c-craftjs.github.io/table/table.js";
import { UrlGetLatestPost, requestOptionsGet } from "../controller/template.js";
import { token } from "../controller/cookies.js";

CihuyDomReady(async () => {
    const tablebody = CihuyId("tablebody");
    const buttonsebelumnya = CihuyId("prevPageBtn");
    const buttonselanjutnya = CihuyId("nextPageBtn");
    const halamansaatini = CihuyId("currentPage");
    const itemperpage = 5;
    let halamannow = 1;

    async function fetchData() {
        try {
            const response = await fetch(UrlGetLatestPost, await requestOptionsGet());
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
            tableData += `
                <tr>
                    <td hidden></td>
                    <td style="text-align: center; vertical-align: middle">
                        <p class="fw-normal mb-1">${sequentialNumber}</p>
                    </td>
                    <td style="text-align: center; vertical-align: middle">
                        <p class="fw-normal mb-1">${values.updated}</p>
                    </td>               
                    <td style="text-align: center; vertical-align: middle">
                        <p class="fw-normal mb-1">${values.blog.prodi}</p>
                    </td>                             
                    <td style="text-align: center; vertical-align: middle">
                        <p class="fw-normal mb-1">${values.url}</p>
                    </td>                             
                    <td style="text-align: center; vertical-align: middle">
                        <p class="fw-normal mb-1">${values.title}</p>
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
