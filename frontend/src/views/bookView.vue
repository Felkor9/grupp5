<template>
  <section>
    <div class="container-heading">
      <h2>Boka</h2>
      <button @click="goBack" class="goBackButton">
        <img src="../assets/arrowback.svg" alt="Back arrow" class="icon" />
      </button>
    </div>
    <div class="calendar-wrapper">
      <div class="calendar">
        <div class="calendar-header">
          <span class="month-nav" @click="changeMonth(-1)">&lt;</span>
          <span class="month-year"
            >{{ monthNames[currentMonth] }} {{ currentYear }}</span
          >
          <span class="month-nav" @click="changeMonth(1)">&gt;</span>
        </div>

        <div class="calendar-body">
          <div class="calendar-week-days">
            <div v-for="day in weekDays" :key="day">{{ day }}</div>
          </div>
          <div class="calendar-days">
            <div
              v-for="(day, index) in calendarDays"
              :key="index"
              :class="{
                'current-date': day.isToday,
                'selected-date':
                  selectedDate &&
                  selectedDate.getDate() === day.value &&
                  selectedDate.getMonth() === currentMonth &&
                  selectedDate.getFullYear() === currentYear,
              }"
              @click="selectDate(day)"
            >
              {{ day.value }}
            </div>
          </div>
        </div>
        <div class="person-selector">
          <label for="people">Antal personer: </label>
          <select id="people" v-model="selectedPeople">
            <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
        <div
          v-if="selectedDate && selectedPeople"
          class="selected-date-display"
        >
          Du har valt:<br />
          {{ formattedSelectedDate }}<br />
          för {{ selectedPeople }} person<span v-if="selectedPeople > 1"
            >er</span
          >.
        </div>

        <router-link
          v-if="selectedDate"
          class="bokning-knapp"
          :to="{ name: 'homeView' }"
          @click="bokaOchNavigera"
        >
          Boka resa
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import {
  useSelectedDateStore,
  useSelectedHotelStore,
  useBokningarStore,
} from "../stores/store";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const weekDays = ["Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"];
const monthNames = [
  "Januari",
  "Februari",
  "Mars",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "Augusti",
  "September",
  "Oktober",
  "November",
  "December",
];

const currentDate = new Date();
const currentMonth = ref(currentDate.getMonth());
const currentYear = ref(currentDate.getFullYear());
const selectedDate = ref(null);
const selectedPeople = ref(1);
const calendarDays = ref([]);

const isLeapYear = (year) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const getFebDays = (year) => (isLeapYear(year) ? 29 : 28);

const generateCalendar = () => {
  const daysInMonth = [
    31,
    getFebDays(currentYear.value),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  const days = [];
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
  const today = new Date();

  for (let i = 0; i < adjustedFirstDay + daysInMonth[currentMonth.value]; i++) {
    if (i >= adjustedFirstDay) {
      const dayValue = i - adjustedFirstDay + 1;
      const isToday =
        dayValue === today.getDate() &&
        currentMonth.value === today.getMonth() &&
        currentYear.value === today.getFullYear();
      days.push({ value: dayValue, isToday });
    } else {
      days.push({ value: "", isToday: false });
    }
  }

  calendarDays.value = days;
};

const changeMonth = (delta) => {
  let newMonth = currentMonth.value + delta;
  let newYear = currentYear.value;

  if (newMonth < 0) {
    newMonth = 11;
    newYear--;
  } else if (newMonth > 11) {
    newMonth = 0;
    newYear++;
  }

  const isBeforeCurrent =
    newYear < currentDate.getFullYear() ||
    (newYear === currentDate.getFullYear() &&
      newMonth < currentDate.getMonth());

  if (isBeforeCurrent) return;

  currentMonth.value = newMonth;
  currentYear.value = newYear;
  generateCalendar();
};

const selectDate = (day) => {
  if (day.value) {
    selectedDate.value = new Date(
      currentYear.value,
      currentMonth.value,
      day.value
    );
  }
};

const formattedSelectedDate = computed(() => {
  if (!selectedDate.value) return "";

  const dayNames = [
    "Måndagen",
    "Tisdagen",
    "Onsdagen",
    "Torsdagen",
    "Fredagen",
    "Lördagen",
    "Söndagen",
  ];

  const dayName = dayNames[selectedDate.value.getDay()];
  const date = selectedDate.value.getDate();
  const month = monthNames[selectedDate.value.getMonth()].toLowerCase();
  const year = selectedDate.value.getFullYear();

  return `${dayName} den ${date} ${month} ${year}`;
});

onMounted(() => {
  dateStore.loadFromStorage();
  generateCalendar();

  if (dateStore.selectedDate) {
    selectedDate.value = new Date(dateStore.selectedDate);
  } else {
    selectedDate.value = new Date();
  }

  if (dateStore.numberOfPeople) {
    selectedPeople.value = dateStore.numberOfPeople;
  }
});

const goBack = () => {
  router.back();
};

const dateStore = useSelectedDateStore();

const bokaOchNavigera = () => {
  if (!selectedDate.value || !selectedPeople.value) return;

  // Uppdatera Pinia
  dateStore.setDate(selectedDate.value);
  dateStore.setNumberOfPeople(selectedPeople.value);

  // Navigera
  router.push({ name: "homeView" });
};
</script>

<style scoped>
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

.calendar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.calendar {
  height: 85vh;
  width: 80vw;
  background-color: white;
  border-radius: 25px;
  padding: 30px 30px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin-bottom: 120px;
}

.calendar-header {
  background: linear-gradient(90deg, #1e3a8a, #2563eb);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
}

.month-nav {
  cursor: pointer;
  font-size: 1.5rem;
  user-select: none;
}

.month-year {
  font-size: 1.2rem;
}

.calendar-week-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: 600;
  color: #1e3a8a;
  margin-top: 20px;
  gap: 2px;
}

.calendar-week-days div {
  display: grid;
  place-items: center;
  height: 50px;
  gap: 2px;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  color: black;
  height: 30vh;
}

.calendar-days div {
  min-width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  cursor: pointer;
  border-radius: 20%;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.calendar-days div:hover {
  background-color: #2563eb;
  color: white;
}

.calendar-days div.current-date {
  background-color: #9ca3af;
  color: white;
}

.calendar-days div.selected-date {
  background-color: #1e3a8a;
  color: white;
}

.person-selector {
  font-weight: bold;
  color: #1e3a8a;
  font-size: 1.1rem;
  margin-top: 30px;
}

.selected-date-display {
  font-weight: bold;
  color: #1e3a8a;
  font-size: 1.1rem;
  margin-top: 40px;
}

select {
  padding: 5px 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
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
  margin-top: 2rem;
}
.bokning-knapp:hover {
  background-color: #1e40af;
}
</style>
