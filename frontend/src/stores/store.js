import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("counter", () => {
  const count = ref(0);

  function counter() {
    count.value++;
  }

  // detta måste ligga sist och funktioner vi använder behöver vara med här för att kunna användas
  return { count, counter };
});

// store för bokningar
export const useBokningarStore = defineStore("bokningar", () => {
  //fetch för att hämta färdiga bokningar
  const bokningar = ref(null);

  function fetchbokningar() {
    fetch("http://localhost:3000/bokningklar/1")
      .then((result) => result.json())
      .then((data) => {
        bokningar.value = data.bokning || [];
        // console.log(data.bokningar);
      });
  }

  // detta måste ligga sist och funktioner vi använder behöver vara med här för att kunna användas
  return { bokningar, fetchbokningar };
});

//För att visa upp resor på första sidan
export const useResorStore = defineStore("resor", () => {
  const resor = ref(null);

  function fetchresor() {
    fetch("http://localhost:3000/resor")
      .then((result) => result.json())
      .then((data) => {
        resor.value = data.resor || [];
        console.log(resor.value);
        console.log(data.resor);
      });
  }
  return { resor, fetchresor };
});

//Visa recensioner
export const useRecensionerStore = defineStore("recensioner", () => {
  const recensioner = ref(null);

  async function fetchrecensioner() {
    try {
      const result = await fetch("http://localhost:3000/recensioner");
      const data = await result.json();
      recensioner.value = data || [];
      console.log(recensioner.value);
    } catch (error) {
      console.error("Fel vid hämtning av recensioner:", error);
    }
  }

  return { recensioner, fetchrecensioner };
});

//Visa upp destinationer
export const useDestinationerStore = defineStore("destination", () => {
  const destination = ref(null);

  function fetchdestinationer() {
    fetch("http://localhost:3000/destination")
      .then((result) => result.json())
      .then((data) => {
        destination.value = data.destination || [];
        console.log(destination.value);
        console.log(data.destination);
      });
  }
  return { destination, fetchdestinationer };
});

//Hämtar och visar rätt destination till vald resa
export const useResaDestinationStore = defineStore("resadestination", () => {
  const resadestination = ref(null);
  const resordestinationer = ref([]);

  function fetchResaDestination(id) {
    fetch(`http://localhost:3000/resadestination/${id}`)
      .then((result) => result.json())
      .then((data) => {
        resordestinationer.value = data.resor || [];
        console.log(resordestinationer.value);
        // console.log(data.resadestination);
      });
  }
  return { resadestination, fetchResaDestination, resordestinationer };
});

//Visa bokningar på vald user
export const useBookingByUserStore = defineStore("bookingByUser", () => {
  const bokningar = ref([]);
  const error = ref(null);

  function getFullBookingByUser(userId) {
    fetch(`http://localhost:3000/bokningar/full/${userId}`)
      .then((result) => result.json())
      .then((data) => {
        bokningar.value = data.bokning || [];
        console.log("Bokningar hämtade:", bokningar.value);
        error.value = null;
      });
  }
  return { bokningar, getFullBookingByUser, error };
});
