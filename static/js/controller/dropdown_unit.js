unitDropdown.addEventListener("change", async function (event) {
    event.preventDefault(); // Mencegah perilaku bawaan dari event change dropdown

    const selectedUnitID = unitDropdown.value;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('unitID', selectedUnitID);
    const newUrl = window.location.pathname + '?' + urlParams.toString(); // Dapatkan URL baru
    history.pushState({}, '', newUrl); // Perbarui URL tanpa menyebabkan pembaruan halaman
});