prodiDropdown.addEventListener("change", async function (event) {
    event.preventDefault(); // Mencegah perilaku bawaan dari event change dropdown

    const selectedProdiID = prodiDropdown.value;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('prodiID', selectedProdiID);
    const newUrl = window.location.pathname + '?' + urlParams.toString(); // Dapatkan URL baru
    history.pushState({}, '', newUrl); // Perbarui URL tanpa menyebabkan pembaruan halaman
});
