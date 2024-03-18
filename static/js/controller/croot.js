import { token } from "./cookies.js";

if (token === "") {
	window.location.assign("https://euis.ulbi.ac.id");
	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: 'Oops sesi anda telah habis, silahkan login lagi.'
	})
	.then(() => {
		window.location.assign("https://euis.ulbi.ac.id");
	})
}