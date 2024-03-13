document.addEventListener("DOMContentLoaded", function () {
    // Ambil elemen dropdown
    const prodiDropdown = document.getElementById("prodiDropdown");

    // Cek apakah ada nilai prodiID yang tersimpan di localStorage
    const storedProdiID = localStorage.getItem("selectedProdiID");

    // Jika ada, atur nilai dropdown sesuai dengan nilai yang tersimpan
    if (storedProdiID) {
        prodiDropdown.value = storedProdiID;
    }

    // Tambahkan event listener untuk menangani perubahan nilai dropdown
    prodiDropdown.addEventListener("change", function () {
        // Dapatkan nilai prodiID yang dipilih
        const selectedProdiID = prodiDropdown.value;

        // Simpan nilai prodiID ke localStorage
        localStorage.setItem("selectedProdiID", selectedProdiID);

        // Perbarui URL dengan menambahkan query parameter prodiID
        const currentURL = new URL(window.location.href);
        currentURL.searchParams.set("prodiID", selectedProdiID);

        // Redirect ke URL yang diperbarui
        window.location.href = currentURL.toString();
    });
});