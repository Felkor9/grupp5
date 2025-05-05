import { defineStore } from 'pinia';
import {ref} from 'vue'

export const useStore = defineStore('resor',() => {
    const count = ref(0)

    function counter() {
        count.value++
    }

    return{count, counter}
});
