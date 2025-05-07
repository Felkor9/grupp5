<template>
  <h1>Home</h1>
  <section>
    <h2>Resor</h2>

    <div v-if="resor && resor.length > 0">
      <div class="resor-kort" v-for="resa in resor" :key="resa.id">
        <div class="resor-rad">
          <span class="resor-rubrik">
            {{ resa.resorDatum.slice(0, 10) }}
          </span>
        </div>
        <div class="resor-rad">
          <span class="resor-rubrik">Land:</span>
          <span class="resor-varde">{{ resa.resorLand }}</span>
        </div>
        <div class="resor-rad">
          <span class="resor-rubrik">Pris:</span>
          <span class="resor-varde">{{ resa.resorPris }}</span>
        </div>
        <div class="bokning-rad">
          <span class="bokning-rubrik">Datum:</span>
          <span class="bokning-varde">{{ resa.resorDatum }}</span>
        </div>
        <div class="bokning-rad">
          <span class="bokning-rubrik">Längd:</span>
          <span class="bokning-varde">{{ resa.resaLangd }}</span>
        </div>
        <button class="bokning-knapp">
          <router-link class="router" to="/">Läs mer</router-link>
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

.bokning-kort {
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

.bokning-kort:active {
  transform: scale(0.98);
}

.bokning-rad {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: #444;
}

.bokning-label {
  font-weight: 600;
  color: #666;
  flex: 1;
}

.bokning-varde {
  flex: 2;
  text-align: right;
  color: #222;
}

.bokning-knapp {
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
</style>
