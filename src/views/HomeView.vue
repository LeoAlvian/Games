<template>
  <div class="home">
    Home and Chart
    <img src="../assets/404.png" alt="" class="img">
    <!-- <input type="text" v-model="stateValue">
    <button @click="saveToLocalStorage()">Save text</button>
    <div class="">{{  state }}</div>

    <div class="clear">
      <button @click="clearLocal()">Clear local storage</button>
    </div> -->
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


<style scoped>


.img {
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}

</style>