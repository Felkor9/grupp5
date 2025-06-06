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
  //fetch för att hämta färdig bokning av specifik användare
  const bokningar = ref(null);

  function fetchbokningar() {
    fetch(`http://localhost:3000/bokningklar/${id}`)
      .then((result) => result.json())
      .then((data) => {
        bokningar.value = data.bokning || [];
        // console.log(data.bokningar);
      });
  }

  //Hämta alla bokningar
  function fetchAllaBokningar() {
    fetch("http://localhost:3000/allabokningar") // Här använder vi en annan endpoint för att hämta alla bokningar
      .then((result) => result.json())
      .then((data) => {
        bokningar.value = data.bokningar || []; // Uppdatera bokningar
      });
  }

  // detta måste ligga sist och funktioner vi använder behöver vara med här för att kunna användas
  return { bokningar, fetchbokningar, fetchAllaBokningar };
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
  const userId = ref(null);

  function getFullBookingByUser(userId) {
    console.log("Hämtar bokningar för userId:", userId);
    fetch(`http://localhost:3000/bokningar/full/${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Fel från servern: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        bokningar.value = data.bokning || [];
        console.log("Bokningar hämtade:", bokningar.value);
        error.value = null;
      })
      .catch((err) => {
        console.error("Fel vid hämtning av bokningar:", err);
        error.value = err.message;
        bokningar.value = [];
      });
  }

  return { bokningar, getFullBookingByUser, error };
});

// Spara valt datum från kalendern
export const useSelectedDateStore = defineStore("selectedDate", () => {
  const selectedDate = ref(null);
  const numberOfPeople = ref(1); // ✅ Lägg till

  function setDate(date) {
    selectedDate.value = date;
    localStorage.setItem("selectedDate", date.toISOString());
  }

  function setNumberOfPeople(n) {
    numberOfPeople.value = n;
    localStorage.setItem("numberOfPeople", n.toString());
  }

  function loadFromStorage() {
    const savedDate = localStorage.getItem("selectedDate");
    const savedPeople = localStorage.getItem("numberOfPeople");

    if (savedDate) {
      selectedDate.value = new Date(savedDate);
    }

    if (savedPeople) {
      numberOfPeople.value = parseInt(savedPeople);
    }
  }

  return {
    selectedDate,
    numberOfPeople,
    setDate,
    setNumberOfPeople,
    loadFromStorage,
  };
});

// stores/authStore.js

export const useAuthStore = defineStore("auth", () => {
  const isLoggedIn = ref(false);
  const user = ref(null);

  const login = (userData) => {
    isLoggedIn.value = true;
    user.value = userData;
    // LocalStorage om du vill spara tillfälligt
    localStorage.setItem("authUser", JSON.stringify(userData));
    console.log('User saved in localStorage:', JSON.parse(localStorage.getItem("authUser")));

  };

  const logout = () => {
    isLoggedIn.value = false;
    user.value = null;
    localStorage.removeItem("authUser");
  };

  const init = () => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      user.value = JSON.parse(storedUser);
      isLoggedIn.value = true;
    }
  };

  return { isLoggedIn, user, login, logout, init };

});

  // Spara valt hotel (+ land, stad, bild)
  export const useSelectedHotelStore = defineStore("selectedHotel", () => {
    const hotel = ref(null);

    function setHotel(data) {
      hotel.value = data;
    }

    return { hotel, setHotel };
  });
