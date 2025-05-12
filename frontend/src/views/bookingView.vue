<template>
  <section>
    <div class="container-heading">
      <h2>Min bokning</h2>
      <button @click="goBack" class="goBackButton">
        <img src="../assets/arrowback.svg" alt="Back arrow" class="icon" />
      </button>
    </div>
    <div v-if="bokningar && bokningar.length > 0">
      <div
        class="bokning-kort"
        v-for="bokning in bokningar"
        :key="bokning.bokningId"
      >
        <div class="bokning-rad">
          <span class="bokning-rubrik">
            {{ bokning.resorDatum.slice(0, 10) }}
          </span>
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
          <span class="bokning-rubrik">Hotell:</span>
          <span class="bokning-varde">{{ bokning.destinationHotell }}</span>
        </div>
        <div class="bokning-rad">
          <div class="stad-img">
            <img
              :src="`/hotellimg/${bokning.destinationHotellBild_url}`"
              style="max-width: 100%"
            />
          </div>
        </div>
      </div>
    </div>

    <p v-else>Det finns inget här att visa. {{ bokningar }}</p>
  </section>
</template>

<script setup>
import { useBookingByUserStore } from "../stores/store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const store = useBookingByUserStore();
const { bokningar } = storeToRefs(store);
const { getFullBookingByUser } = store;
const userId = 1;
// const { fetchbokningar } = store;

onMounted(() => {
  getFullBookingByUser(userId);
  console.log("Bokningar från komponenten:", bokningar.value);
});

const router = useRouter();

// Funktion för att hoppa ett steg bakåt i historiken
const goBack = () => {
  router.back();
};
</script>
<style scoped>
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
  width: 24px; /* Justera storleken på din ikon här */
  height: 24px;
  transition: transform 0.3s ease;
}

.goBackButton:hover .icon {
  transform: scale(1.1); /* Lite förstoring när man hovrar över knappen */
}

section {
  padding: 1.5rem 1rem;
  background-color: #f5f7fa;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
}

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1e3a8a;
  text-align: center;
  font-weight: 700;
  letter-spacing: 1px;
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

p {
  text-align: center;
  color: #888;
  font-size: 1rem;
  margin-top: 2rem;
}
</style>
