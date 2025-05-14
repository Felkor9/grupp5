<template>
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
          <router-link class="router" :to="`/resadestination/${resa.resorId}`"
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
  padding: 2rem 1rem;
  background: linear-gradient(to bottom, #f0f4f8, #e2e8f0);
  min-height: 100vh;
  font-family: "Segoe UI", sans-serif;
}

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1e3a8a;
  text-align: center;
  font-weight: 700;
  letter-spacing: 1px;
}

.resor-kort {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.resor-kort:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
}

.resor-rad {
  display: flex;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: #333;
}

.resor-rubrik {
  font-weight: 600;
  color: #2563eb;
  min-width: 80px;
}

.resor-varde h3 {
  font-size: 1.5rem;
  color: #1e3a8a;
  margin: 0;
}

.resor-varde {
  color: #222;
}

.resor-img img {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  max-height: 240px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
}

.bokning-knapp {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;
  transition: background-color 0.2s ease;
}

.bokning-knapp:hover {
  background-color: #1e40af;
}

.router {
  color: white;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
