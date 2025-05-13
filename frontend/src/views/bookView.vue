<template>
  <h2>Boka</h2>

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
      <div v-if="selectedDate && selectedPeople" class="selected-date-display">
        Du har valt:<br />
        {{ formattedSelectedDate }}<br />
        för {{ selectedPeople }} person<span v-if="selectedPeople > 1">er</span
        >.
      </div>
      <div class="booking-button-wrapper">
        <button @click="läggTillBokning;" :disabled="!selectedDate">
          Lägg till bokning
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useSelectedDateStore } from "../stores/store";

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

const dateStore = useSelectedDateStore();

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

const läggTillBokning = () => {
  if (!selectedDate.value || !selectedPeople.value) return;

  dateStore.setDate(selectedDate.value);
  dateStore.setNumberOfPeople(selectedPeople.value);

  console.log("Bokning sparad i store:", {
    datum: selectedDate.value,
    personer: selectedPeople.value,
  });
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
</script>

<style scoped>
h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1e3a8a;
  text-align: center;
  font-weight: 700;
  letter-spacing: 1px;
  padding-top: 2rem;
  font-family: "Segoe UI", sans-serif;
}

.calendar-wrapper {
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.calendar {
  height: 90vh;
  width: 65vw;
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
  width: 33px;
  height: 33px;
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

.booking-button-wrapper {
  margin-top: 45px;
  text-align: center;
}

.booking-button-wrapper button {
  padding: 10px 20px;
  background-color: #2563eb;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.booking-button-wrapper button:disabled {
  background-color: #9ca3af; /* grå */
  cursor: not-allowed;
}

.booking-button-wrapper button:hover:not(:disabled) {
  background-color: #1e3a8a;
}
</style>
