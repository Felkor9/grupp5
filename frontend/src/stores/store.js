import { defineStore } from 'pinia';
import {ref} from 'vue'

export const useStore = defineStore('resor',() => {
    const count = ref(0)

    function counter() {
        count.value++
    }






//fetch för att hämta färdiga bokningar
const bokningar = ref(null);

function fetchbokningar() {
	fetch("http://localhost:3000/bokningklar")
		.then((result) => result.json())
		.then((data) => {
			bokningar.value = data.bokningar;
			console.log(bokningar.value);
			console.log(data.bokningar);
		});
    }




// detta måste ligga sist och funktioner vi använder behöver vara med här för att kunna användas
return { count, counter, bokningar, fetchbokningar }




});
