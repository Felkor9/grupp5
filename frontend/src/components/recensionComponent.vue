<script setup>
import { useRecensionerStore } from "../stores/store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const store = useRecensionerStore();
const { recensioner } = storeToRefs(store);
const { fetchrecensioner } = store;

onMounted(fetchrecensioner);
</script>

<template>
	<section>
		<h2>Detta gillade gästerna som bott här</h2>
		<ul>
			<li class="lista-recensioner" v-for="recension in recensioner" :key="recension.id">
				<strong>{{ recension.namn }}</strong>
				<p>"{{ recension.recensioner[0] }}"</p>
			</li>
		</ul>
	</section>
</template>

<style scoped>
section {
	padding: 1.5rem 1rem;
	background-color: #f5f7fa;
	min-height: 100vh;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
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

.lista-recensioner {
	background-color: white;
	border-radius: 8px;
	padding: 1rem;
	margin-bottom: 1rem;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
