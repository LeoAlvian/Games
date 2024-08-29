<template>
  <div class="home">
    <input type="text" v-model="stateValue">
    <button @click="saveToLocalStorage()">Save text</button>
    <div class="">{{  state }}</div>

    <div class="clear">
      <button @click="clearLocal()">Clear local storage</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';


export default defineComponent({
  name: 'HomeView',
  components: {
    
  },
  setup() {
    const stateValue = ref('')
    const state = ref(localStorage.getItem('name'))

    const saveToLocalStorage = () => {
      window.localStorage.setItem('name', stateValue.value)
      console.log(localStorage.getItem('name'));
      
      state.value = stateValue.value
    }

    const clearLocal = () => {
      window.localStorage.clear()
    }

    return { state, stateValue, saveToLocalStorage, clearLocal }
  },
});
</script>
