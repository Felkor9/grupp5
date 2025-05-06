<script setup>
import navbarMenu from "./components/navbarMenu.vue";
import FeelHeader from "./components/FeelHeader.vue";
import { useStore } from "./stores/store";
import { ref, onMounted } from "vue";

const counter = useStore();
const resor = ref(null);

function fetchresor() {
	fetch("http://localhost:3000/resor")
		.then((result) => result.json())
		.then((data) => {
			resor.value = data.resor;
			console.log(resor.value);
			console.log(data.resor);
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
		<routerView />
		<!-- <h1>Hej</h1>
		<ul>
			<li v-for="resa in resor" :key="resa.id">
				<p>{{ resa.resorLand }}</p>
			</li>
		</ul> -->

		<!-- <p>{{ counter.count }}</p>
		<button @click="counter.counter">Klicka här</button> -->
	</main>
</template>

<style>
* {
	margin: 0;
	padding: 0;
}
</style>
