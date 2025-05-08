<script setup>
import navbarMenu from "./components/navbarMenu.vue";
import FeelHeader from "./components/FeelHeader.vue";
import { ref } from "vue";
import MenuBarComponent from "./components/MenuBarComponent.vue";
</script>

<template>
	<header>
		<FeelHeader />
		<navbarMenu />
		<MenuBarComponent />
	</header>
	<main>
		<routerView />
	</main>
</template>

<style>
* {
	margin: 0;
	padding: 0;
}
</style>
