<template>
	<div class="container">
		<div class="lista-hållare">
			<div class="list-item">
				<router-link class="router" to="/home">
					<img src="../assets/explore.svg" alt="" class="icon-menubar" />
				</router-link>
				<router-link class="router" to="/home">Utforska</router-link>
			</div>
			<div v-if="auth.isLoggedIn" class="list-item">
				<!-- Visa andra delar av sidan som kräver inloggning -->
				<button @click="loggaUt">Logga ut</button>
			</div>
			<div class="list-item">
				<router-link class="router" to="/profile">
					<img src="../assets/bokningar.svg" alt="" class="icon-menubar" />
				</router-link>
				<router-link class="router" to="/profile">Bokningar</router-link>
			</div>
		</div>
	</div>
</template>
<script setup>
import { useAuthStore } from "../stores/store";
import { useRouter } from "vue-router";
const auth = useAuthStore();
const router = useRouter();

// Kolla om användaren är inloggad när komponenten laddas
auth.init();

// Metod för att logga ut användaren
const loggaUt = () => {
	auth.logout();
	router.push("/");
	// Du kan också omdirigera användaren till en annan sida om du vill
	// router.push("/login");
};
</script>

<style scoped>
.container {
	width: 100vw;
	height: 40px;
	font-size: 0.8rem;
	display: flex;
	margin-bottom: 10px;
}

.lista-hållare {
	height: 40px;
	width: 100%;
	list-style: none;
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-right: 17px;
}

.list-item {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.router {
	color: black;
	text-decoration: none;
}

.icon-menubar {
	height: 20px;
	width: 20px;
}
button {
	background-color: #2563eb;
	color: white;
	border: none;
	padding: 0.5rem 1rem;
	border-radius: 12px;
	cursor: pointer;
	font-weight: 300;
	text-align: center;
	transition: background-color 0.2s ease;
}
</style>
