<template>
  <section>
    <h2>Destination</h2>
    <div v-if="resordestinationer && resordestinationer.length > 0">
      <div
        class="destinationer-kort"
        v-for="destination in resordestinationer"
        :key="destination.destinationId"
      >
        <div class="destinationer-rad">
          <!-- <div class="destinationer-varde"> -->
          <h3>{{ destination.destinationStad }}</h3>
          <!-- </div> -->
          <div class="destinationer-rad">
            <!-- <div class="destinationer-varde"> -->
            <b>Hotell: </b>{{ destination.destinationHotell }}
            <!-- </div> -->
          </div>
        </div>
        <div class="stad-img">
          <img
            :src="`/hotellimg/${destination.destinationHotellBild_url}`"
            style="max-width: 100%"
          />
          <button class="bokning-knapp">Boka detta hotell</button>
        </div>
      </div>
    </div>
    <p v-else>Det finns inga resor att boka för tillfället.</p>
  </section>
</template>
<script setup>
import { useRoute } from "vue-router";
import { useResaDestinationStore } from "../stores/store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
const route = useRoute();
const store = useResaDestinationStore();
// const { destination } = storeToRefs(store);
// const { fetchResaDestination } = store;
const { resadestination, resordestinationer } = storeToRefs(store);
onMounted(() => {
  console.log("Route params", route.params);
  store.fetchResaDestination(route.params.id);
});
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
.destinationer-kort {
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
.destinationer-kort:active {
  transform: scale(0.98);
}
.destinationer-rad {
  display: flex;
  justify-content: space-around;
  font-size: 1rem;
  color: #444;
}
.destinationer-label {
  font-weight: 600;
  color: #666;
  flex: 1;
}
/* .destinationer-varde {
  flex: 2;
  /* text-align: right; */
/* color: #222; */
/* } */
/* .destinationer-knapp {
  padding: 5px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
} */
.bokning-knapp {
  color: #222;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  text-decoration: none;
  font-size: 1rem;
}
p {
  /* text-align: left; */
  color: #888;
  font-size: 1rem;
  margin-top: 2rem;
}
.stad-img {
  max-width: 80%;
}
</style>
