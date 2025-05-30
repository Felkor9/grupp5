<template>
  <section>
    <div class="container-heading">
      <h2>Destination</h2>
      <button @click="goBack" class="goBackButton">
        <img src="../assets/arrowback.svg" alt="Back arrow" class="icon" />
      </button>
    </div>
    <div v-if="resordestinationer && resordestinationer.length > 0">
      <div
        class="destinationer-kort"
        v-for="destination in resordestinationer"
        :key="destination.destinationId"
      >
        <div
          class="destinationer-rad"
          :style="`background-image: url('/stadimg/${destination.destinationStadBild_url}')`"
        >
          <span class="destinationer-hotell">
            <h3>{{ destination.destinationStad }}</h3>
            Hotell:
            <p>{{ destination.destinationHotell }}</p>
          </span>
        </div>
        <div class="stad-img">
          <!-- <img
						:src="`/stadimg/${destination.destinationStadBild_url}`"
						style="max-width: 100%" /> -->
          <img
            :src="`/hotellimg/${destination.destinationHotellBild_url}`"
            style="max-width: 100%"
          />
          <router-link
            class="bokning-knapp"
            :to="{ name: 'book' }"
            @click="bokaHotel(hotel)"
          >
            Boka detta hotell
          </router-link>
        </div>

        <div class="container">
          <recensionComponent class="skriva-recensioner" />
        </div>
      </div>
    </div>
    <p v-else>Det finns inga resor att boka för tillfället.</p>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import recensionComponent from "../components/recensionComponent.vue";
import {
  useResaDestinationStore,
  useSelectedHotelStore,
} from "../stores/store";

const route = useRoute();
const router = useRouter();

const destinationStore = useResaDestinationStore();
const selectedHotelStore = useSelectedHotelStore();

const { resadestination, resordestinationer } = storeToRefs(destinationStore);

onMounted(() => {
  console.log("Route params:", route.params);
  destinationStore.fetchResaDestination(route.params.id);
});

const goBack = () => {
  router.back();
};

function bokaHotel(hotel) {
  selectedHotelStore.setHotel({
    namn: hotel.namn,
    stad: hotel.stad,
    land: hotel.land,
    bild: hotel.bild,
  });
}
</script>

<style scoped>
.container {
  height: fit-content;
}
section {
  padding: 2rem 1rem;
  background: linear-gradient(to bottom, #f0f4f8, #e2e8f0);
  min-height: 100vh;
  font-family: "Segoe UI", sans-serif;
}

.container-heading {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  position: relative;
  align-items: center;
}

.goBackButton {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: absolute;
  top: 15%;
  left: 0;
}

.icon {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

h2 {
  font-size: 1.75rem;
  margin-bottom: 1.25rem;
  color: #1e3a8a;
  text-align: center;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.destinationer-kort {
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

.destinationer-kort:active {
  transform: scale(0.99);
}

.stad-img {
  overflow: hidden;
  position: relative;
}

.stad-img img {
  width: 100%;
  max-height: 240px;
  border-radius: 12px;
  object-fit: cover;
  transition: transform 0.4s ease;
  width: 100%;
  z-index: 10;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
}

.destinationer-kort:active img {
  transform: scale(1.03);
}

.destinationer-rad {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: #2563eb;
  min-width: 80px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 0.5rem;
  border-radius: 12px;
}

.destinationer-hotell {
  font-weight: 600;
  color: #2563eb;
  min-width: 80px;
  display: inline;
  background-color: #ffffff;
  opacity: 0.8;
  border-radius: 12px;
  padding: 10px;
}

.destinationer-rad h3 {
  font-size: 1.5rem;
  color: #1e3a8a;
  margin: 0;
}

.destinationer-rad span {
  font-weight: 600;
  color: #2563eb;
  min-width: 80px;
  display: inline;
}

.destinationer-rad p {
  display: inline;
  color: #222;
  font-weight: lighter;
  font-size: medium;
  margin-left: 15px;
}

.bokning-knapp {
  background-color: #007bff;
  color: white;
  padding: 0.75em 1.5em;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s ease;
  margin: 1rem auto;
  display: block;
}
.bokning-knapp:hover {
  background-color: #1e40af;
}
</style>
