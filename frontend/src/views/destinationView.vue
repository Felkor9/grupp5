<template>
	<section>
		<div class="container-heading">
			<h2>Destination</h2>
			<button @click="goBack" class="goBackButton">
				<img src="../assets/arrowback.svg" alt="Back arrow" class="icon" />
			</button>
		</div>
		<div v-if="resordestinationer && resordestinationer.length > 0">
			<div
				class="destinationer-kort"
				v-for="destination in resordestinationer"
				:key="destination.destinationId">
				<div class="destinationer-rad" :style="`background-image: url('/stadimg/${destination.destinationStadBild_url}')`">
					<span class="destinationer-hotell">
            <h3>{{ destination.destinationStad }}</h3>
						Hotell:  <p> {{ destination.destinationHotell }}</p>
					</span>
				</div>
				<div class="stad-img">
          <!-- <img
						:src="`/stadimg/${destination.destinationStadBild_url}`"
						style="max-width: 100%" /> -->
					<img
						:src="`/hotellimg/${destination.destinationHotellBild_url}`"
						style="max-width: 100%" />
					<button class="bokning-knapp">Boka detta hotell</button>
				</div>
			</div>
		</div>
		<p v-else>Det finns inga resor att boka för tillfället.</p>
	</section>
</template>


<script setup>
import { useRoute } from "vue-router";
import { useResaDestinationStore } from "../stores/store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const route = useRoute();
const store = useResaDestinationStore();
// const { destination } = storeToRefs(store);
// const { fetchResaDestination } = store;
const { resadestination, resordestinationer } = storeToRefs(store);
onMounted(() => {
	console.log("Route params", route.params);
	store.fetchResaDestination(route.params.id);
});

const router = useRouter();

// Funktion för att hoppa ett steg bakåt i historiken
const goBack = () => {
	router.back();
};
</script>


<style scoped>
section {
	padding: 2rem 1rem;
	background: linear-gradient(to bottom, #f0f4f8, #e2e8f0);
	min-height: 100vh;
	font-family: "Segoe UI", sans-serif;
}

.container-heading {
	display: flex;
	flex-direction: row-reverse;
	justify-content: center;
	position: relative;
	align-items: center;
}

.goBackButton {
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
	position: absolute;
	top: 15%;
	left: 0;
}

.icon {
	width: 24px; /* Justera storleken på din ikon här */
	height: 24px;
	transition: transform 0.3s ease;
}

h2 {
	font-size: 1.75rem;
	margin-bottom: 1.25rem;
	color: #1e3a8a;
	text-align: center;
	font-weight: 700;
	letter-spacing: 0.5px;
}

.destinationer-kort {
	background-color: #ffffff;
	border-radius: 20px;
	padding: 1.5rem;
	margin-bottom: 2rem;
	box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
	display: flex;
	flex-direction: column;
	gap: 1rem;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	max-width: 600px;
	margin-left: auto;
	margin-right: auto;
}

.destinationer-kort:active {
	transform: scale(0.99);
}

.stad-img{
  overflow: hidden;
  position: relative;
}

.stad-img img {
	width: 100%;
	max-height: 240px;
  /* margin: auto; */
  /* height: auto; */
  border-radius: 12px;
	object-fit: cover;
	transition: transform 0.4s ease;
	z-index: 10;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
}

.destinationer-kort:active img {
	transform: scale(1.03);
}

.destinationer-rad h3 {
	font-size: 1.5rem;
	color: #1e3a8a;
	margin: 0;
  opacity: 10;
}

.destinationer-rad {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 0.5rem;
	font-size: 1.1rem;
	color: #2563eb;
	min-width: 80px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding:0.5rem;
  border-radius: 12px;
}

.destinationer-hotell{
  font-weight: 600;
	color: #2563eb;
	min-width: 80px;
  display: inline;
  background-color: #ffffff;
  opacity: 0.7;
  border-radius: 12px;
  padding:10px;
}

.destinationer-rad p {
  display: inline;
  color: #222;
  font-weight: lighter;
  font-size:medium;
  margin-left: 15px;
  opacity: 10;
}

.bokning-knapp {
	background-color: #2563eb;
	color: white;
	border: none;
	padding: 0.75rem 1.25rem;
	border-radius: 12px;
	cursor: pointer;
	font-size: 1rem;
	font-weight: 600;
	text-align: center;
	margin-top: 1rem;
	transition: background-color 0.2s ease;
  width: 100%;
}

.bokning-knapp:hover {
	background-color: #1e40af;
}

</style>
