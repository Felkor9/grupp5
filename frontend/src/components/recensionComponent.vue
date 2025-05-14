<script setup>
import { useRecensionerStore } from "../stores/store";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import StarRating from "vue-star-rating";

const store = useRecensionerStore();
const { recensioner } = storeToRefs(store);
const { fetchrecensioner } = store;

const visaFormular = ref(false);
const läggTillRecension = ref(false);

function toggleFormular() {
	visaFormular.value = !visaFormular.value;
	console.log("clicked");
}

function addrecension() {
	läggTillRecension.value = !läggTillRecension.value;
}

const namn = ref("");
const datum = ref(null);
const recension1 = ref("");
const recension2 = ref("");

const fetchRecensioner = async () => {
	try {
		const response = await fetch("http://localhost:3000/recensioner");
		recensioner.value = await response.json();
	} catch (error) {
		console.error("Fel vid hämtning:", error);
	}
};

const submitForm = async () => {
	try {
		const response = await fetch("http://localhost:3000/recensioner", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				namn: namn.value,
				datum: datum.value,
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

		fetchRecensioner();
		visaFormular.value = false;
	} catch (error) {
		console.error("Fel vid skickning:", error);
		alert("Något gick fel");
	}
};

fetchRecensioner();

onMounted(fetchrecensioner);
</script>

<template>
	<section>
		<h2>Detta gillade gästerna som bott här:</h2>
		<ul>
			<li class="lista-recensioner" v-for="recension in recensioner" :key="recension.id">
				<strong>{{ recension.namn }}</strong>
				<StarRating
					:rating="recension.betyg"
					:read-only="true"
					:star-size="24"
					:show-rating="false"
					class="stars" />
				<div v-for="(rec, index) in recension.recensioner" :key="index">
					<p>{{ rec }}</p>
				</div>
			</li>
		</ul>
		<div class="div-button">
			<router-link to="/recension">
				<button type="button" class="add-button" @click="toggleFormular">
					<p>Skriv en recension</p>
					<img src="../assets/pencil.svg" alt="pen-icon" class="icon" />
				</button>
			</router-link>
		</div>
	</section>
</template>

<style scoped>
section {
	padding: 1.5rem 1rem;
	background-color: #f5f7fa;
	height: fit-content;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
	border-radius: 13px;
}

h2 {
	font-size: 1rem;
	margin-bottom: 1.5rem;
	color: #222;
	text-align: left;
	font-weight: 600;
}
ul {
	list-style-type: none;
}

.stars {
	margin-top: 10px;
	margin-bottom: 10px;
}

.lista-recensioner {
	background-color: white;
	border-radius: 8px;
	padding: 1rem;
	margin-bottom: 1rem;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	z-index: 1;
}
.div-button {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.add-button {
	background-color: #2563eb;
	color: white;
	border: none;
	padding: 0.75rem 1.25rem;
	border-radius: 12px;
	cursor: pointer;
	font-size: 0.8rem;
	font-weight: 600;
	text-align: center;
	transition: background-color 0.2s ease;
	width: 100%;
	display: flex;
	justify-content: center;
}

.icon {
	height: 20px;
	width: 20px;
	margin-left: 10px;
}

img {
	height: 20px;
	width: 20px;
	margin-left: 10px;
}

.recension-form {
	transform: translateX(-50%);
	z-index: 10;
}

.label {
	font-weight: 600;
	font-size: 0.95rem;
	color: #000000;
	width: 100%;
	text-align: left;
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
</style>
