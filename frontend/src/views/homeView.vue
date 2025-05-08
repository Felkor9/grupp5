<template>
  <h1>Home</h1>
  <section>
    <h2>Resor</h2>

    <div v-if="resor && resor.length > 0">
      <div class="resor-kort" v-for="resa in resor" :key="resa.id">
        <div class="resor-rad">
          <!-- <span class="resor-rubrik">Land:</span> -->
          <span class="resor-varde"
            ><h3>{{ resa.resorLand }}</h3></span
          >
        </div>
        <div class="resor-rad">
          <span class="resor-varde">{{ resa.resorPris }} kr</span>
        </div>
        <div class="resor-rad">
          <span class="resor-rubrik">Avresa: </span>
          <span class="resor-varde">{{ resa.resorDatum }}</span>
        </div>
        <div class="resor-rad">
          <span class="resor-rubrik">Längd: </span>
          <span class="resor-varde">{{ resa.resorLangd }} dagar</span>
        </div>
        <div class="resor-img">
          <img
            :src="`/resorimg/${resa.resorbild_url}`"
            alt=""
            style="max-width: 100%"
          />
        </div>
        <button class="bokning-knapp">
          <router-link class="router" :to="`/resadestination/${resa.id}`"
            >Visa resmål</router-link
          >
        </button>
      </div>
    </div>

    <p v-else>Det finns inga resor att boka för tillfället.</p>
  </section>
</template>

<script setup>
import { useResorStore } from "../stores/store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const store = useResorStore();
const { resor } = storeToRefs(store);
const { fetchresor } = store;

onMounted(fetchresor);
</script>

<style scoped>
section {
  padding: 1.5rem 1rem;
  background-color: #f5f7fa;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
}

h2 {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: #222;
  text-align: center;
  font-weight: 600;
}

.resor-kort {
  background-color: #fff;
  border-radius: 14px;
  padding: 1.25rem 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.2s ease;
}

.resor-kort:active {
  transform: scale(0.98);
}

.resor-rad {
  display: flex;
  /* justify-content: space-between; */
  font-size: 1rem;
  color: #444;
}

.resor-label {
  font-weight: 600;
  color: #666;
  flex: 1;
}

.resor-varde {
  flex: 2;
  /* text-align: right; */
  color: #222;
}

.resor-knapp {
  padding: 5px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
}

.router {
  color: #222;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  text-decoration: none;
  font-size: 1rem;
}

p {
  text-align: center;
  color: #888;
  font-size: 1rem;
  margin-top: 2rem;
}

.resor-img {
  max-width: 80%;
}
</style>
