import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyDomReady, CihuyQuerySelector } from "https://c-craftjs.github.io/table/table.js";
import { UrlGetAllPostProdi, requestOptionsGet } from "../controller/template.js";
import { token } from "../controller/cookies.js";

CihuyDomReady(() => {
	const tablebody = CihuyId("tablebody");
	const buttonsebelumnya = CihuyId("prevPageBtn");
	const buttonselanjutnya = CihuyId("nextPageBtn");
	const halamansaatini = CihuyId("currentPage");
	const itemperpage = 5;
	let halamannow = 1;

	async function fetchDataByProdiID(prodiID) {
		try {
			const response = await fetch(UrlGetAllPostProdi + `?prodiID=${prodiID}`, await requestOptionsGet());
			if (!response.ok) {
				throw new Error('Gagal mendapatkan semua posting');
			}

			const data = await response.json();
			return data.data.items;
		} catch (error) {
			console.error('Terjadi kesalahan:', error);
			return []; // Mengembalikan array kosong jika terjadi kesalahan
		}
	}

	async function loadContentByProdiID(prodiID) {
		const items = await fetchDataByProdiID(prodiID);

		// Memuat ulang tabel dengan data baru
		let tableData = "";
		items.forEach((values, index) => {
			const sequentialNumber = index + 1;

			// Format the date
			const datePublished = new Date(values.published);
			const dateUpdated = new Date(values.updated);
			const options = {
				day: 'numeric',
				month: 'long', // Use 'short' or 'long' for abbreviated or full month names
				year: 'numeric',
			};

			const formattedDatePublished = new Intl.DateTimeFormat('id-ID', options).format(datePublished);
			const formattedDateUpdated = new Intl.DateTimeFormat('id-ID', options).format(dateUpdated);

			const timePartPublished = datePublished.toLocaleTimeString('id-ID', {
				hour12: false
			});
			const timePartUpdated = dateUpdated.toLocaleTimeString('id-ID', {
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
                    <p class="fw-normal mb-1">${values.title}</p>
                </td>               
                <td style="text-align: center; vertical-align: middle">
                    <a href="${values.url}" target="_blank">${values.url}</a>
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

	// Memuat konten saat halaman dimuat berdasarkan prodiID dari URL
	document.addEventListener("DOMContentLoaded", async function () {
		const prodiDropdown = document.getElementById("prodiDropdown");

		// Memuat konten saat halaman dimuat berdasarkan prodiID dari URL
		const urlParams = new URLSearchParams(window.location.search);
		const prodiID = urlParams.get('prodiID');
		if (prodiID) {
			loadContentByProdiID(prodiID);
		}

		// Menambahkan event listener untuk menangani perubahan nilai dropdown
		prodiDropdown.addEventListener("change", async function () {
			// Dapatkan nilai prodiID yang dipilih
			const selectedProdiID = prodiDropdown.value;

			// Memuat konten dengan prodiID yang baru dipilih
			loadContentByProdiID(selectedProdiID);
		});
	});
});