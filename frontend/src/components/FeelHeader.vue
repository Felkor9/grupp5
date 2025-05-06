<template>
	<header class="feel-header">
		<div class="logo-container">
			<div class="logo-icon">💬</div>
			<h1 class="logo-text">FEEL</h1>
		</div>
	</header>
</template>

<script setup>
// Inget script behövs just nu
</script>

<style scoped>
.feel-header {
	width: 100%;
	background: linear-gradient(90deg, #1e3a8a, #2563eb);
	padding: 20px 0;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
	position: sticky;
	top: 0;
	z-index: 100;
}

.logo-container {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12px;
}

.logo-icon {
	font-size: 2rem;
	color: white;
	text-shadow: 0 0 5px #60a5fa;
}

.logo-text {
	font-size: 2.5rem;
	font-weight: 700;
	font-family: "Segoe UI", sans-serif;
	color: white;
	letter-spacing: 4px;
	text-shadow: 0 0 10px #3b82f6, 0 0 20px #60a5fa;
}
</style>
