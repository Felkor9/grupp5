<template>
	<div class="containerForButton">
		<!-- Formuläret visas ovanpå knappen -->
		<form class="recension-form" @submit.prevent="submitForm">
			<img src="../assets/bakåtpil.svg" alt="pil bakåt" class="img-arrow" @click="toggleFormular" />
			<label for="namn" class="label">Namn:</label>
			<input v-model="namn" type="text" id="namn" name="namn" required />

			<label for="datum" class="label">Datum: YYYY-MM-DD</label>
			<input v-model="datum" type="date" id="datum" name="datum" required />

			<label>Betyg:</label>
			<StarRating :star-size="30" :show-rating="false" v-model:rating="rating" class="star" />

			<label for="recension1" class="label">Skriv din recension här:</label>
			<textarea
				v-model="recension1"
				id="recension1"
				name="recension1"
				required
				placeholder="Skriv här:"></textarea>
			<button class="addrec" @click="addrecension" type="button">
				Lägg till en till recension
			</button>
			<textarea
				v-if="läggTillRecension"
				v-model="recension2"
				name="recension2"
				id="recension2"
				placeholder="Skriv här:"></textarea>

			<button type="submit">Skicka</button>
		</form>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRecensionerStore } from "../stores/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import StarRating from "vue-star-rating";

const router = useRouter();
const store = useRecensionerStore();
const { recensioner } = storeToRefs(store);
const { fetchrecensioner } = store;

onMounted(fetchrecensioner);
const namn = ref("");
const datum = ref(null);
const recension1 = ref("");
const recension2 = ref("");
const visaFormular = ref(false);
const läggTillRecension = ref(false);
const rating = ref(null);

function toggleFormular() {
	router.back();
	console.log("clicked");
}

function addrecension() {
	läggTillRecension.value = !läggTillRecension.value;
}

const fetchRecensioner = async () => {
	try {
		const response = await fetch("http://localhost:3000/recensioner");
		recensioner.value = await response.json();
	} catch (error) {
		console.error("Fel vid hämtning:", error);
	}
};
console.log("Rating skickas:", rating.value);

const submitForm = async () => {
	try {
		const response = await fetch("http://localhost:3000/recensioner", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				namn: namn.value,
				datum: datum.value,
				betyg: rating.value,
				recensioner: [recension1.value, recension2.value],
			}),
		});
		console.log("du har skickat din recension");
		const result = await response.json();
		console.log("Svar från servern:", result);
		alert(result.message || "Tack för att du recenserar vårt boende");
		recension1.value = "";
		recension2.value = "";
		namn.value = "";
		datum.value = "";
		router.back();

		fetchRecensioner();
		visaFormular.value = false;
	} catch (error) {
		console.error("Fel vid skickning:", error);
		alert("Något gick fel");
	}
};

fetchRecensioner();
</script>

<style scoped>
.containerForButton {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
	background-color: #f5f7fa;
	height: fit-content;
}
.recension-form {
	width: 100%;
	max-width: 100vh;
	height: 90vh;
	background-color: #ffffff;
	padding: 2rem;
	border-radius: 16px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.label {
	font-weight: 600;
	font-size: 0.95rem;
	color: #000000;
	width: 100%;
	text-align: left;
}

.img-arrow {
	height: 30px;
	width: 30px;
}

input,
textarea {
	width: 100%;
	padding: 0.9rem 1rem;
	border: 1px solid #ddd;
	border-radius: 12px;
	font-size: 1rem;
	background-color: #f5f7fa;
	box-sizing: border-box;
}

input:focus,
textarea:focus {
	border-color: #007aff;
	background-color: #fff;
	outline: none;
}

.recension-form button[type="submit"] {
	background-color: #007aff;
	color: white;
	border: none;
	padding: 0.9rem 1rem;
	font-size: 1rem;
	border-radius: 12px;
	cursor: pointer;
	transition: background-color 0.2s ease;
}

.recension-form button[type="submit"]:hover {
	background-color: #005fcc;
}

.div-button {
	position: relative;
	width: 100vw;
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.add-button {
	position: fixed;
	left: 42.5%;
	bottom: 15%;
	z-index: 25;
	height: 5em;
	width: 5em;
	border-radius: 100%;
	border: 1px solid black;
	cursor: pointer;
	box-shadow: 0.1px 0.1px 0.4em rgb(185, 185, 185);
}

.addrec {
	background-color: white;
	border: none;
	color: blue;
	cursor: pointer;
}
</style>
