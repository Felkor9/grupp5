<template>
	<nav class="navigation-bar">
		<ul class="nav-lista">
			<li class="lista-knapp"><router-link class="router-link" to="/">Home</router-link></li>
			<li class="lista-knapp">
				<router-link class="router-link" to="/profile">Min profil</router-link>
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
}

.lista-knapp {
	display: flex;
	align-items: center;
	justify-content: center;
	/* margin: 10px; */
	background-color: grey;
	width: 50vw;
	height: 40px;
}

.router-link {
	color: black;
	text-decoration: none;
}
</style>
