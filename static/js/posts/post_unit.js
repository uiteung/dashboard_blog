import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyDomReady, CihuyQuerySelector } from "https://c-craftjs.github.io/table/table.js";
import { UrlGetAllPostUnit, requestOptionsGet } from "../controller/template.js";
import { token } from "../controller/cookies.js";

CihuyDomReady(() => {
    const tablebody = CihuyId("tablebody");
    const buttonsebelumnya = CihuyId("prevPageBtn");
    const buttonselanjutnya = CihuyId("nextPageBtn");
    const halamansaatini = CihuyId("currentPage");
    const itemperpage = 5;
    let halamannow = 1;

    async function fetchDataByUnitID(unitID) {
        try {
            const response = await fetch(UrlGetAllPostUnit + `?unitID=${unitID}`, await requestOptionsGet());
            if (!response.ok) {
                throw new Error('Gagal mendapatkan semua posting');
            }

            const data = await response.json();
            if (!data.data || !data.data.items) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Data untuk Unit ini tidak tersedia.'
                })
                throw new Error('Data tidak tersedia atau tidak lengkap');
            }
            return data.data.items;
        } catch (error) {
            console.error('Terjadi kesalahan saat memuat data:', error);
            return []; // Mengembalikan array kosong jika terjadi kesalahan
        }
    }

    async function loadContentByUnitID(unitID) {
        const items = await fetchDataByUnitID(unitID);

        // Memuat ulang tabel dengan data baru
        let tableData = "";
        items.forEach((values, index) => {
            const sequentialNumber = index + 1;

            // Format the date
            const dateObj = new Date(values.updated);
            const options = {
                day: 'numeric',
                month: 'long', // Use 'short' or 'long' for abbreviated or full month names
                year: 'numeric',
            };

            const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(dateObj);

            const timePart = dateObj.toLocaleTimeString('id-ID', {
                hour12: false
            });

            tableData += `
                <tr>
                <td hidden></td>
                <td style="text-align: center; vertical-align: middle">
                    <p class="fw-normal mb-1">${sequentialNumber}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                    <p class="fw-normal mb-1">${formattedDate.replace('.', ',')}, <br>Pukul ${timePart} WIB</p>
                </td>                           
                <td style="text-align: center; vertical-align: middle">
                    <p class="fw-normal mb-1">${values.title}</p>
                </td>               
                <td style="text-align: center; vertical-align: middle">
                    <a href="${values.url}" target="_blank">${values.url}</a>
                </td>                           
                <td style="text-align: center; vertical-align: middle">
                    <p class="fw-normal mb-1">${values.author.displayName}</p>
                </td>               
                <td style="text-align: center; vertical-align: middle">
                    <p class="fw-normal mb-1">${values.replies.totalItems}</p>
                </td>               
                <td style="text-align: center; vertical-align: middle">
                    <p class="fw-normal mb-1">${values.id}</p>
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

    // Memuat konten saat halaman dimuat berdasarkan unitID dari URL
    document.addEventListener("DOMContentLoaded", async function () {
        const unitDropdown = document.getElementById("unitDropdown");

        // Memuat konten saat halaman dimuat berdasarkan unitID dari URL
        const urlParams = new URLSearchParams(window.location.search);
        const unitID = urlParams.get('unitID');
        if (unitID) {
            loadContentByUnitID(unitID);
        }

        // Menambahkan event listener untuk menangani perubahan nilai dropdown
        unitDropdown.addEventListener("change", async function () {
            // Dapatkan nilai unitID yang dipilih
            const selectedUnitID = unitDropdown.value;

            // Memuat konten dengan unitID yang baru dipilih
            loadContentByUnitID(selectedUnitID);
        });
    });
});