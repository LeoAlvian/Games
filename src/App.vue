<template>
  <SideBar/>
  <div class="main-pannel" :style="{ 'margin-left' : '47px' }">
    <router-view />
  </div>
</template>

<script>

import SideBar from './components/sidebar/SideBar.vue'
import { sidebarWidth } from './components/sidebar/State'

export default {
  components: {SideBar},
  setup () {
    return { sidebarWidth }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main-pannel {
  transition: 0.4s ease-in-out;
}
</style>
