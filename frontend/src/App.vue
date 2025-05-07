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
    <!-- <h1>Hej</h1>
    <ul>
      <li v-for="resa in resor" :key="resa.id">
        <p>{{ resa.resorLand }}</p>
      </li> -->
    <!-- </ul> -->
  </main>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
