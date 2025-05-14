<template>
  <div v-if="hotel && date">
    <h2>Bokningsbekräftelse</h2>
    <p><strong>Hotell:</strong> {{ hotel.namn }}</p>
    <p><strong>Stad:</strong> {{ hotel.stad }}</p>
    <p><strong>Land:</strong> {{ hotel.land }}</p>
    <p><strong>Datum:</strong> {{ formattedDate }}</p>
    <p><strong>Antal personer:</strong> {{ people }}</p>
    <p><strong>Pris:</strong> {{ hotel.pris }} kr</p>
    <button @click="gåTillBookingView">Bekräfta</button>
  </div>
</template>

<script setup>
import { useSelectedHotelStore, useSelectedDateStore } from "../stores/store";
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const hotelStore = useSelectedHotelStore();
const dateStore = useSelectedDateStore();
const router = useRouter();

onMounted(() => {
  hotelStore.loadHotel();
  dateStore.loadFromStorage();
});

const hotel = hotelStore.selectedHotel;
const date = dateStore.selectedDate;
const people = dateStore.numberOfPeople;

const formattedDate = computed(() => {
  return date ? new Date(date).toLocaleDateString() : "";
});

function gåTillBookingView() {
  router.push("/booking");
}
</script>
