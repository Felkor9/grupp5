<template>
	<div class="container">
		<recensionComponent class="skriva-recension" />
		<AddRecensionComponent class="knapp-recension" />
	</div>
</template>
<script setup>
import AddRecensionComponent from "../components/addRecensionComponent.vue";
import recensionComponent from "../components/recensionComponent.vue";
</script>

<style scoped>
.container {
	position: relative;
	width: 100%;
	min-height: 100vh;
	display: flex;
}

.skriva-recension {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 5;
}

.knapp-recension {
	position: fixed;
	top: 0;
	right: 0;
	z-index: 10;
}
</style>
