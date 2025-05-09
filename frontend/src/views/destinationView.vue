<template>
	<section>
		<h2>Destination</h2>
		<div v-if="resordestinationer && resordestinationer.length > 0">
			<div
				class="destinationer-kort"
				v-for="destination in resordestinationer"
				:key="destination.destinationId">
				<div class="destinationer-rad">
					<!-- <div class="destinationer-varde"> -->
					<h3>{{ destination.destinationStad }}</h3>
					<!-- </div> -->
					<div class="destinationer-rad">
						<!-- <div class="destinationer-varde"> -->
						<b>Hotell: </b>{{ destination.destinationHotell }}
						<!-- </div> -->
					</div>
				</div>
				<div class="stad-img">
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
const route = useRoute();
const store = useResaDestinationStore();
// const { destination } = storeToRefs(store);
// const { fetchResaDestination } = store;
const { resadestination, resordestinationer } = storeToRefs(store);
onMounted(() => {
	console.log("Route params", route.params);
	store.fetchResaDestination(route.params.id);
});
</script>
<style scoped>
section {
	padding: 1.5rem 1rem;
	background: linear-gradient(to bottom, #f0f4f8, #dbeafe);
	font-family: "Segoe UI", sans-serif;
	min-height: 100vh;
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
	border-radius: 16px;
	box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
	margin-bottom: 1.5rem;
	overflow: hidden;
	transition: transform 0.3s ease;
	display: flex;
	flex-direction: column;
}

.destinationer-kort:active {
	transform: scale(0.99);
}

.stad-img {
	width: 100%;
	height: 180px;
	overflow: hidden;
	border-bottom: 1px solid #eee;
}

.stad-img img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform 0.4s ease;
}

.destinationer-kort:active img {
	transform: scale(1.03);
}

.destinationer-rad {
	padding: 1rem 1.25rem 0.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
}

.destinationer-rad h3 {
	font-size: 1.25rem;
	color: #1e3a8a;
	margin: 0;
}

.destinationer-rad span {
	font-size: 1rem;
	color: #444;
	line-height: 1.4;
}

.bokning-knapp {
	margin: 0.75rem 1.25rem 1.25rem;
	background: #2563eb;
	color: white;
	border: none;
	width: 100%;
	padding: 0.75rem;
	font-size: 1rem;
	font-weight: 600;
	border-radius: 10px;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

.bokning-knapp:hover {
	background-color: #1e40af;
}

p {
	text-align: center;
	color: #888;
	font-size: 1rem;
	margin-top: 2rem;
}
</style>
