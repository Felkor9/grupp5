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

// function fetchresor() {
//   fetch("http://localhost:3000/resor")
//     .then((result) => result.json())
//     .then((data) => {
//       resor.value = data.resor;
//       console.log(resor.value);
//       console.log(data.resor);
//     });
// }
