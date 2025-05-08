<script setup>
import { ref } from "vue";

const visaFormular = ref(false);

function toggleFormular() {
	visaFormular.value = !visaFormular.value;
	console.log("clicked");
}
</script>

<template>
	<div class="containerForButton">
		<button type="button" class="add-button" @click="toggleFormular">
			<p>+</p>
		</button>

		<!-- Formuläret visas ovanpå knappen -->
		<form v-if="visaFormular" class="recension-form">
			<label for="namn" class="label">Namn:</label>
			<input type="text" id="namn" name="namn" />

			<label for="datum" class="label">Datum: YYMMDD</label>
			<input type="text" id="datum" name="datum" />

			<label for="recension" class="label">Skriv din recension här:</label>
			<textarea id="recension" name="recension"></textarea>

			<button type="submit">Skicka</button>
		</form>
	</div>
</template>

<style scoped>
.containerForButton {
	position: relative;
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
	background-color: #f5f7fa00;
}

.recension-form {
	position: absolute;
	top: 5rem;
	left: 50%;
	transform: translateX(-50%);
	width: 90%;
	max-width: 400px;
	height: 90vh;
	background-color: #ffffff;
	padding: 1.5rem;
	border-radius: 16px;
	z-index: 5;
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

.add-button {
	position: relative;
	z-index: 10;
	height: 50px;
	width: 50px;
	border-radius: 100%;
	border: 1px solid black;
	cursor: pointer;
	margin: 1rem;
	box-shadow: 0.1px 0.1px 0.4em rgb(185, 185, 185);
}
</style>
