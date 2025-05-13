<template>
  <div class="contianer">
    <div class="calendar" ref="calendar">
      <div class="calendar-header">
        <span class="month-picker" @click="toggleMonthList">{{
          monthNames[currentMonth]
        }}</span>
        <div class="year-picker">
          <span class="year-change" @click="changeYear(-1)">
            <pre><</pre>
          </span>
          <span id="year">{{ currentYear }}</span>
          <span class="year-change" @click="changeYear(1)">
            <pre>></pre>
          </span>
        </div>
      </div>

      <div class="calendar-body">
        <div class="calendar-week-days">
          <div v-for="day in weekDays" :key="day">{{ day }}</div>
        </div>
        <div class="calendar-days">
          <div
            v-for="(day, index) in calendarDays"
            :key="index"
            :class="{ 'current-date': day.isToday }"
          >
            {{ day.value }}
          </div>
        </div>
      </div>

      <div class="calendar-footer"></div>

      <div class="date-time-formate">
        <div class="day-text-formate">{{ todayLabel }}</div>
        <div class="date-time-value">
          <div class="time-formate">{{ currentTime }}</div>
          <div class="date-formate">{{ currentDateFormatted }}</div>
        </div>
      </div>

      <div class="month-list" :class="monthListClass">
        <div v-for="(month, index) in monthNames" :key="month">
          <div @click="selectMonth(index)">{{ month }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

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
const calendarDays = ref([]);
const showMonthList = ref(false);

const todayLabel = "TODAY";
const currentTime = ref("");
const currentDateFormatted = ref("");

const isLeapYear = (year) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const getFebDays = (year) => (isLeapYear(year) ? 29 : 28);

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  currentDateFormatted.value = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

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
  const firstDay = new Date(currentYear.value, currentMonth.value).getDay();
  const today = new Date();

  for (let i = 0; i < firstDay + daysInMonth[currentMonth.value]; i++) {
    if (i >= firstDay) {
      const dayValue = i - firstDay + 1;
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

const changeYear = (delta) => {
  currentYear.value += delta;
  generateCalendar();
};

const toggleMonthList = () => {
  showMonthList.value = true;
};

const selectMonth = (index) => {
  currentMonth.value = index;
  showMonthList.value = false;
  generateCalendar();
};

const monthListClass = computed(() => {
  return {
    show: showMonthList.value,
    hide: !showMonthList.value,
    hideonce: !showMonthList.value,
  };
});

onMounted(() => {
  generateCalendar();
  updateTime();
  setInterval(updateTime, 1000);
});
</script>

<style scoped>
.contianer {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #9796f0, #fbc7d4);
}

.calendar {
  height: 610px;
  width: max-content;
  background-color: white;
  border-radius: 25px;
  overflow: hidden;
  padding: 30px 50px 0px 50px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.calendar-header {
  background: #9796f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  color: white;
  padding: 10px;
}

.calendar-week-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: 600;
  cursor: pointer;
  color: rgb(104, 104, 104);
}

.calendar-week-days div:hover {
  color: black;
  transform: scale(1.2);
  transition: all 0.2s ease-in-out;
}

.calendar-week-days div {
  display: grid;
  place-items: center;
  height: 50px;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  color: black;
}

.calendar-days div {
  width: 37px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  position: relative;
  cursor: pointer;
  animation: to-top 1s forwards;
}

.calendar-days div:hover {
  background-color: #fbc7d4;
  border-radius: 20%;
  color: white;
  transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
}

.calendar-days div.current-date {
  color: white;
  background-color: #9796f0;
  border-radius: 20%;
}

.month-picker {
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
}

.year-picker {
  display: flex;
  align-items: center;
}

.year-change {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin: 0px 10px;
  cursor: pointer;
}

.year-change:hover {
  background-color: #9796f0;
  transition: all 0.2s ease-in-out;
  transform: scale(1.12);
}

#year:hover {
  cursor: pointer;
  transform: scale(1.2);
  transition: all 0.2s ease-in-out;
}

.month-list {
  position: relative;
  left: 0;
  top: -50px;
  background-color: #ebebeb;
  color: black;
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 5px;
  border-radius: 20px;
}

.month-list > div {
  display: grid;
  place-content: center;
  margin: 5px 10px;
  transition: all 0.2s ease-in-out;
}

.month-list > div > div {
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;
}

.month-list > div > div:hover {
  background-color: #9796f0;
  color: white;
  transform: scale(0.9);
}

.month-list.show {
  visibility: visible;
  pointer-events: visible;
  animation: to-left 0.71s forwards;
}

.month-list.hideonce {
  visibility: hidden;
}

.month-list.hide {
  animation: to-right 1s forwards;
  visibility: none;
  pointer-events: none;
}

.date-time-formate {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  top: 140px;
  display: inline;
  justify-content: center;
}

.day-text-formate {
  font-size: 1.4rem;
  padding-right: 5%;
  border-right: 3px solid #9796f0;
  position: absolute;
  left: -1rem;
}

.date-time-value {
  display: block;
  position: relative;
  left: 40%;
  top: -18px;
  text-align: center;
}

.time-formate {
  font-size: 1.5rem;
}

@keyframes to-top {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  100% {
    transform: translateY(100%);
    opacity: 1;
  }
}

@keyframes to-left {
  0% {
    transform: translateX(230%);
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes to-right {
  10% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-150%);
    opacity: 1;
  }
}

@media (max-width: 375px) {
  .month-list > div {
    margin: 5px 0px;
  }
}
</style>
