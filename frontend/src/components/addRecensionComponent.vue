<script setup></script>
<template>
	<div>
		<button class="add-button"><p>+</p></button>
	</div>
</template>

<style scoped>
div {
	width: 100%;
	display: flex;
	justify-content: center;
	background-color: #f5f7fa;
	min-height: 50vh;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
	margin: 0;
}
.add-button {
	height: 50px;
	width: 50px;
	border-radius: 100%;
	border: 1px solid black;
	cursor: pointer;
	margin-top: 0;
	box-shadow: 0.1px 0.1px 0.4em rgb(185, 185, 185);
}

.add-button:active {
	transform: scale(0.98);
}
</style>
