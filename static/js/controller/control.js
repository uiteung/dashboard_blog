import { GetdatabyEmail, ValidasiData } from "./template.js";


export function ModalUpdate(header, waktu) {
    fetch(GetdatabyEmail + waktu, {
        method: 'GET',
        headers: header
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
            const pokok = data.data['pokok'];
            const keluarga = data.data['keluarga'];
            const pangan = data.data['pangan'];
            const kinerja = data.data['kinerja'];
            const keahlian = data.data['keahlian'];
            const struk = data.data['fgs-struk'];
            const transportasi = data.data['transportasi'];
            const kehadiran = data.data['kehadiran'];
            const kopkar = data.data['kopkar'];
            const bankJabar = data.data['bankJabar'];
            const arisan = data.data['arisan'];
            const bpjs = data.data['bpjs'];
            const bauk = data.data['bauk'];
            const pph = data.data['pph'];
            const lain2 = data.data['lain2'];

            Swal.fire({
                title: "<strong>Form Update <b>Data Gaji</b></strong>",
                html:` 
                <span style="text-align: left; position: relative;">Gaji Pokok</span>
                <input type="text" id="gajipokok" class="swal2-input" placeholder="Gaji Pokok" value="${pokok}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Keluarga</span>
                <input type="text" id="keluarga" class="swal2-input" placeholder="Keluarga" value="${keluarga}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Pangan</span>
                <input type="text" id="pangan" class="swal2-input" placeholder="Pangan" value="${pangan}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Kinerja</span>
                <input type="text" id="kinerja" class="swal2-input" placeholder="kinerja" value="${kinerja}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Keahlian</span>
                <input type="text" id="keahlian" class="swal2-input" placeholder="keahlian" value="${keahlian}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Stuktural/Fungsional</span>
                <input type="text" id="fgs/struk" class="swal2-input" placeholder="FGS/Struk" value="${struk}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Transportasi</span>
                <input type="text" id="transport" class="swal2-input" placeholder="Transport" value="${transportasi}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Kehadiran</span>
                <input type="text" id="kehadiran" class="swal2-input" placeholder="Kehadiran" value="${kehadiran}"><br><br>
                <span style="text-align: left; position: relative;">Potongan Kopkar</span>
                <input type="text" id="kopkar" class="swal2-input" placeholder="Kopkar" value="${kopkar}"><br><br>
                <span style="text-align: left; position: relative;">Potongan Bank Jabar</span>
                <input type="text" id="bankjabar" class="swal2-input" placeholder="Bank Jabar" value="${bankJabar}"><br><br>
                <span style="text-align: left; position: relative;">Potongan Arisan</span>
                <input type="text" id="arisan" class="swal2-input" placeholder="Arisan" value="${arisan}"><br><br>
                <span style="text-align: left; position: relative;">Potongan BPJS</span>
                <input type="text" id="bpjstk" class="swal2-input" placeholder="BPJS TK" value="${bpjs}"><br><br>
                <span style="text-align: left; position: relative;">Potongan BAUK</span>
                <input type="text" id="bauk" class="swal2-input" placeholder="BAUK" value="${bauk}"><br><br>
                <span style="text-align: left; position: relative;">Potongan Lain - lain</span>
                <input type="text" id="lain-lain" class="swal2-input" placeholder="Lain - Lain" value="${lain2}"><br><br>
                <span style="text-align: left; position: relative;">Potongan PPH</span>
                <input type="text" id=pph" class="swal2-input" placeholder="pph" value="${pph}"><br><br>
                `,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: `
                   Update
                `,
                confirmButtonAriaLabel: data.success,
                cancelButtonText: `
                  Cancel
                `,
                cancelButtonAriaLabel: "Gagal"
              })
            }
        })
      .catch(error => {
        console.error("Error while updating data:", error);
      });
}

export function getLastMonth() {
    // Get the current date
    const currentTime = new Date();
  
    // Subtract one month from the current date
    currentTime.setMonth(currentTime.getMonth() - 1);
  
    // Format the date as "YYYYMM"
    const year = currentTime.getFullYear();
    const month = (currentTime.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const formattedDate = `${year}${month}`;
  
    return formattedDate;
  }


export function validate(email, header, date) {
    const postData = {
        nama: '',
        email: email,
        tanggal_tahun: date,
        validate : true
      };
      console.log(postData)
    fetch(ValidasiData, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(postData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Display success SweetAlert
    
          Swal.fire({
            icon : 'success',
            title: 'Data Gaji Berhasil Divalidasi!',
            backdrop: `
              rgba(0,0,123,0.4)
            `
          }).
          then(() => {
            // Refresh the page after successful addition
            window.location.href = 'validasi-data.html';
          });
        } else {
          // Display error SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.status,
          });
        }
      })
      .catch(error => {
        console.error("Error while updating data:", error);
      });
  }

export function Batal(email, header, date) {
    const postData = {
        nama: '',
        email: email,
        tanggal_tahun: date,
        validate : false
      };
    fetch(ValidasiData, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(postData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Display success SweetAlert
    
          Swal.fire({
            icon : 'success',
            title: 'Validasi Berhasil Dibatalkan!',
            backdrop: `
              rgba(0,0,123,0.4)
            `
          }).
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Data Rekap Hari ini Berhasil Diupdate!',
          // }).
          then(() => {
            // Refresh the page after successful addition
            window.location.href = 'validasi-data.html';
          });
        } else {
          // Display error SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Data rekap Gagal Diupdate!',
          });
        }
      })
      .catch(error => {
        console.error("Error while updating data:", error);
      });
  }


  export function responseSearch(data) {
    Swal.fire({
      title: data.success,
      text: "Berhasil Mencari data",
      icon: "success"
    });
    console.log(data)
  }