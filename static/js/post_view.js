import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyDomReady, CihuyQuerySelector } from "https://c-craftjs.github.io/table/table.js";
import { UrlGetAllPost, requestOptionsGet } from "./controller/template.js";
import { token } from "./controller/cookies.js";

// Untuk Membuat Pagination
CihuyDomReady(() => {
	const tablebody = CihuyId("tablebody");
	const buttonsebelumnya = CihuyId("prevPageBtn");
	const buttonselanjutnya = CihuyId("nextPageBtn");
	const halamansaatini = CihuyId("currentPage");
	const itemperpage = 5;
	let halamannow = 1;

	fetch(UrlGetAllPost, requestOptionsGet)
		.then((result) => {
			return result.json();
		})
		.then((data) => {
			console.log(data);
			// Check if data.data.items is an array before using map
			if (Array.isArray(data.data.items)) {
				let tableData = "";
				data.data.items.map((values, index) => {
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
                            <p class="fw-normal mb-1">${values.id}</p>
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
                            <p class="fw-normal mb-1">${formattedDate.replace('.', ',')}, Pukul ${timePart} WIB</p>
                        </td>               
                    </tr>`;
				});
				document.getElementById("tablebody").innerHTML = tableData;

				displayData(halamannow);
				updatePagination();
			} else {
				console.error('Items is not an array:', data.data.items);
			}
		})
		.catch(error => {
			console.log('error', error);
		});

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
});