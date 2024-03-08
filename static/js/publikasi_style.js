document.addEventListener("DOMContentLoaded", function() {
    // Mendengarkan perubahan pada dropdown "Jenis Rekap"
    document.querySelector('.form-select').addEventListener('change', function() {
        // Mendapatkan nilai yang dipilih dari dropdown
        const selectedOption = this.value;
        
        // Mendapatkan elemen-elemen yang akan diubah visibility-nya
        const rekapGrafik = document.getElementById('rekapGrafik');
        const rekapTabelRekap = document.getElementById('rekapTabelRekap');
        const rekapTabelRekapJenis = document.getElementById('rekapTabelRekapJenis');
        
        // Mengubah visibility berdasarkan pilihan yang dipilih
        if (selectedOption === 'grafik') {
            rekapGrafik.hidden = false;
            rekapTabelRekap.hidden = true;
            rekapTabelRekapJenis.hidden = true;
        } else if (selectedOption === 'tabel') {
            rekapGrafik.hidden = true;
            rekapTabelRekap.hidden = false;
            rekapTabelRekapJenis.hidden = false;
        }
    });
});
