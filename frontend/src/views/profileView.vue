<template>
  <section>
    <h2>Mina bokningar</h2>

    <div v-if="bokningar && bokningar.length > 0">
      <div class="bokning-kort" v-for="bokning in bokningar" :key="bokning.id">
        <div class="bokning-rad">
          <span class="bokning-rubrik">
            {{ bokning.resorDatum.slice(0, 10) }}
          </span>
        </div>
        <div class="bokning-rad">
          <span class="bokning-rubrik">Namn:</span>
          <span class="bokning-varde">{{ bokning.userName }}</span>
        </div>
        <div class="bokning-rad">
          <span class="bokning-rubrik">Land:</span>
          <span class="bokning-varde">{{ bokning.resorLand }}</span>
        </div>
        <div class="bokning-rad">
          <span class="bokning-rubrik">Stad:</span>
          <span class="bokning-varde">{{ bokning.destinationStad }}</span>
        </div>
        <div class="bokning-rad">
          <span class="bokning-rubrik">Platser:</span>
          <span class="bokning-varde">{{ bokning.bokningAntalPlatser }}</span>
        </div>
        <button class="bokning-knapp">
          <router-link class="router" to="/">Läs mer</router-link>
        </button>
      </div>
    </div>

    <p v-else>Du har inga bokningar ännu.</p>
  </section>
</template>

<script setup>
import { useBokningarStore } from "../stores/store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const store = useBokningarStore();
const { bokningar } = storeToRefs(store);
const { fetchbokningar } = store;

onMounted(fetchbokningar);
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
