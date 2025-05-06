<script setup>
import navbarMenu from "./components/navbarMenu.vue";
import FeelHeader from "./components/FeelHeader.vue";
import { useStore } from "../stores/store";
import { ref, onMounted } from "vue";

const counter = useStore();
const resor = ref(null);

function fetchresor() {
	fetch("http://localhost:3000/resor")
		.then((result) => result.json())
		.then((data) => {
			resor.value = data;
			console.log(resor.value);
			console.log(data);
		});
}

onMounted(fetchresor);
</script>

<template>
	<header>
		<FeelHeader />
		<navbarMenu />
	</header>
	<main>
		<ul>
			<li v-for="resa in resor" :key="resa.id">
				<p>{{ resa[0].resorLand }}</p>
			</li>
		</ul>

		<p>{{ counter.count }}</p>
		<routerView />
		<button @click="counter.counter">Klicka här</button>
	</main>
</template>

<style>
* {
	margin: 0;
	padding: 0;
}
</style>
