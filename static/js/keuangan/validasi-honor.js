// Import function & library yang dibutuhkan
import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyDomReady } from "https://c-craftjs.github.io/table/table.js";
import { ValidasiHonor } from "../controller/template.js";

// Untuk Autentifikasi Login User Tertentu
import { token } from "../controller/cookies.js";
import { getLastMonth } from "../controller/control.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

const requestOptions = {
  method: "POST",
  headers: header
};
  
  // Call the function to get the last month
  const date = getLastMonth();
  
  // Print the last month
  console.log("Last Month:", date);


// Untuk Get All data Presensi
CihuyDomReady(() => {
//   const tablebody = CihuyId("tablebody");
  const buttonsebelumnya = CihuyId("prevPageBtn");
  const buttonselanjutnya = CihuyId("nextPageBtn");
  const halamansaatini = CihuyId("currentPage");
  const itemperpage =6;
  let halamannow = 1;
  let filteredData = []; // To store the filtered data for search
  let totalData = 0;
  // Ambil data masuk
  fetch(ValidasiHonor  + date, requestOptions)
    .then((result) => result.json())
    .then((rekapharian) => {
        let rkp = rekapharian.data

        if (rkp.length === 0 ) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Data Honor Bulan Ini belum ada',
          });
        }

          // Inisialisasi data tabel
          totalData = rkp.length;
          filteredData = rkp;

          // Untuk Memunculkan Pagination Halamannya
          displayData(halamannow);
          updatePagination();

          // Button Pagination (Sebelumnya)
          buttonsebelumnya.addEventListener("click", () => {
            if (halamannow > 1) {
              halamannow--;
              displayData(halamannow);
              updatePagination();
            }
          });

          // Button Pagination (Selanjutnya)
          buttonselanjutnya.addEventListener("click", () => {
            const totalPages = Math.ceil(totalData / itemperpage);
            if (halamannow < totalPages) {
              halamannow++;
              displayData(halamannow);
              updatePagination();
            }
          })
        //   console.log(rekapharian)
    });

  // Fungsi Untuk Menampilkan Data
  function displayData(page) {
    const mulaiindex = (page - 1) * itemperpage;
    const akhirindex = mulaiindex + itemperpage;
    const rowsToShow = filteredData.slice(mulaiindex, akhirindex);;
    document.getElementById("tablebody").innerHTML = "";

    // Iterasi melalui rowsToShow dan membangun baris tabel
    rowsToShow.forEach((combinedEntry) => {

      // Ekstrak data yang relevan
      const nama = combinedEntry['nama'];
      const namamatkul = combinedEntry['namamatkul'];
      const kelas = combinedEntry['kelas'];
      const jurusan = combinedEntry['jurusan'];
      const jumlahtemu = combinedEntry['jumlah-temu'];
      const honorajar = combinedEntry['honor-ajar'];
    //   console.log(struk)

      const barisBaru = document.createElement("tr");
        barisBaru.innerHTML= `
        <td>
            <div class="d-flex align-items-center">
                <div class="ms-3">
                    <p class="fw-bold mb-1">${nama}</p>
                </div>
            </div>
        </td>
        <td style="text-align: center; vertical-align: middle">
          <p class="fw-normal mb-1">${namamatkul}</p>
        </td>
        <td style="text-align: center; vertical-align: middle">
          <p class="fw-normal mb-1"><b>${kelas}</b></p>
        </td>
        <td style="text-align: center; vertical-align: middle">
            <p class="fw-normal mb-1">${jurusan}</p>
        </td>
        <td style="text-align: center; vertical-align: middle">
            <p class="fw-normal mb-1">${jumlahtemu}</p>
        </td>
        <td style="text-align: center; vertical-align: middle">
            <p class="fw-normal mb-1">${honorajar}</p>
        </td>
      `;



      document.getElementById("tablebody").appendChild(barisBaru);
  });
    updatePagination();

  }


  // Fungsi Untuk Update Pagination
  function updatePagination() {
    halamansaatini.textContent = `Halaman ${halamannow}`;
  }
});