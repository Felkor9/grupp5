<template>
  <div>
    <h1>Boka resa</h1>
    <calendarComponent />
  </div>
</template>

<script setup>
import calendarComponent from "@/components/calendarComponent.vue";

export default {
  components: {
    calendarComponent,
  },
};
</script>
