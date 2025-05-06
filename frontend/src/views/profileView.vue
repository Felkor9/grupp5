<template>
	<h2>Mina bokningar</h2>
</template>
<script setup>
import { useStore } from "../stores/store";
import { ref, onMounted } from "vue";

const { bokningar, fetchbokningar } = useStore();

onMounted(() => {
	fetchbokningar();
});
</script>
