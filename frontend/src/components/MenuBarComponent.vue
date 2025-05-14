<template>
	<div class="container">
		<div class="lista-hållare">
			<div class="list-item">
				<router-link class="router" to="/home">
					<img src="../assets/explore.svg" alt="" class="icon-menubar" />
				</router-link>
				<router-link class="router" to="/home">Utforska</router-link>
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
<script setup></script>

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
</style>
