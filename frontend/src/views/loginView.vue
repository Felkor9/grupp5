<template>
	<div class="loggainView">
		<div class="loggainContainer">
			<h2>Logga in</h2>
			<form @submit.prevent="loggaIn">
				<div v-if="loginError" class="loginErrorContainer">
					<p class="LoginErrorP">Fel användarnamn eller lösenord</p>
				</div>
				<div class="inputGroup">
					<label for="email">Användarnamn</label>
					<input
						type="username"
						id="username"
						v-model="username"
						placeholder="Användarnamn"
						required />
				</div>
				<div class="inputGroup">
					<label for="password">Lösenord</label>
					<input type="password" id="password" v-model="password" placeholder="••••••••" required />
				</div>
				<button type="submit" class="loginButton">Logga in</button>
			</form>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
const loginStatus = ref(""); // För att spara status från backend
const loginError = ref(""); // För felmeddelanden

async function loggaIn() {
	console.log("Inloggningsförsök med:", username.value, password.value);

	// Rensa tidigare felmeddelanden
	loginError.value = "";

	try {
		const response = await fetch("http://localhost:3000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username.value,
				password: password.value,
			}),
		});

		const data = await response.json();

		if (data.statusLogin === "OK") {
			// Lyckad inloggning
			loginStatus.value = "OK";
			console.log("Inloggning lyckades");
			// Här kan du t.ex. omdirigera till en annan sida eller uppdatera UI
			// router.push('/dashboard'); // Om du använder vue-router
			router.push("/home");
		} else {
			// Misslyckad inloggning
			username.value = "";
			password.value = "";
			loginError.value = data.message || "Inloggning misslyckades";
			console.error("Inloggning misslyckades:", loginError.value);
		}
	} catch (error) {
		// Något gick fel med fetch-anropet
		loginError.value = "Nätverksfel eller serverproblem";
		console.error("Fel vid inloggning:", error);
	}
}
</script>

<style scoped>
.loggainView {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	/* margin-top: 100px; */
	min-height: 100vh;
	background: linear-gradient(to bottom, #dfefff, #f4f9ff);
}

.loggainContainer {
	background: #ffffff;
	border-radius: 20px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	padding: 2rem;
	width: 90%;
	max-width: 400px;
	text-align: center;
	margin-top: 100px;
}

.loggainContainer h2 {
	color: #123ba0;
	margin-bottom: 1rem;
}

.loginErrorContainer {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 10px;
	margin-bottom: 10px;
}
.LoginErrorP {
	color: red;
	font-weight: 900;
}

.inputGroup {
	display: flex;
	flex-direction: column;
	text-align: left;
	margin-bottom: 1rem;
}

.inputGroup label {
	margin-bottom: 0.5rem;
	color: #123ba0;
	font-weight: bold;
}

.inputGroup input {
	padding: 0.8rem;
	border-radius: 12px;
	border: 1px solid #ccc;
	font-size: 1rem;
	outline: none;
	transition: border-color 0.3s;
}

.inputGroup input:focus {
	border-color: #2a60f6;
}

.loginButton {
	background-color: #2a60f6;
	color: white;
	border: none;
	padding: 0.9rem 2rem;
	border-radius: 14px;
	font-size: 1rem;
	cursor: pointer;
	margin-top: 1rem;
	transition: background-color 0.3s;
}

.loginButton:hover {
	background-color: #1a4bd6;
}
</style>
