<template>
	<nav class="navigation-bar">
		<ul class="nav-lista">
			<li class="lista-knapp">
				<router-link class="router-link" to="/home">Home</router-link>
			</li>
			<li class="lista-knapp">
				<router-link class="router-link" to="/profile">Min Profil</router-link>
			</li>
		</ul>
	</nav>
</template>

<script setup></script>

<style scoped>
.navigation-bar {
	width: 100%;
	padding: 0;
	margin: 0;
	position: relative;
	background: linear-gradient(90deg, #1e3a8a, #2563eb);
}

.nav-lista {
	width: 100vw;
	/* height: 50px; */
	margin: 0;
	padding: 0;
	justify-content: center;
	align-items: center;
	display: flex;
	list-style-type: none;
	z-index: 20;
}

.lista-knapp {
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin: 10px;
	/* background-color: rgb(254, 254, 254); */
	width: 100vw;
	height: 45px;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.router-link {
	color: rgb(255, 255, 255);
	text-decoration: none;
}
</style>
