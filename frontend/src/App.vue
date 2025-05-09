<template>
	<div class="layout">
		<header>
			<FeelHeader />
			<navbarMenu />
		</header>
		<main class="content">
			<routerView />
		</main>
		<footer class="footer">
			<MenuBarComponent />
		</footer>
	</div>
</template>

<script setup>
import navbarMenu from "./components/navbarMenu.vue";
import FeelHeader from "./components/FeelHeader.vue";
import { ref } from "vue";
import MenuBarComponent from "./components/MenuBarComponent.vue";
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html,
body {
	height: 100%;
}

/* header {
	margin: 0;
	padding: 0;
	height: fit-content;
} */

.layout {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	position: relative;
}

.content {
	flex: 1;
}

.footer {
	/* valfri styling */
	background-color: #f1f1f1;
	padding: 1rem;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 20;
}
</style>
