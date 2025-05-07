import { defineStore } from 'pinia';
import {ref} from 'vue'

export const useStore = defineStore('resor',() => {
    const count = ref(0)

    function counter() {
        count.value++
    }

// detta måste ligga sist och funktioner vi använder behöver vara med här för att kunna användas
return { count, counter }

});

// store för bokningar
export const useBokningarStore = defineStore('bokningar', () => {

	//fetch för att hämta färdiga bokningar
const bokningar = ref(null);

function fetchbokningar() {
	fetch("http://localhost:3000/bokningklar/1")
		.then((result) => result.json())
		.then((data) => {
			bokningar.value = data.bokning || [];
			console.log(data.bokning);
		})
	}

	// detta måste ligga sist och funktioner vi använder behöver vara med här för att kunna användas
	return { bokningar, fetchbokningar}

})











































export const useRecensionerStore = defineStore('recensioner', () => {
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
