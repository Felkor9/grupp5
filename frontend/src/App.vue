<script setup>
import navbarMenu from "./components/navbarMenu.vue";
import FeelHeader from "./components/FeelHeader.vue";
import { ref } from "vue";
</script>

<template>
  <header>
    <FeelHeader />
    <navbarMenu />
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
