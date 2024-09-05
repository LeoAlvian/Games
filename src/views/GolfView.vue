<template>
  <div class="hero-golf">
    Golf

    <div class="cards">
      <div class="card">
        <div class="element item1 title-table"><h5 class="table-content1">Name</h5></div>
        <div class="element item2 title-table"><h5 class="table-content">Bet</h5></div>
        <div class="element item2 title-table"><h5 class="table-content">Get</h5></div>
        <div class="element item2 title-table"><h5 class="table-content">Score</h5></div>
      </div>
      <div class="card">
        <div class="element item1 "><p class="table-content1">Leo</p><span class="winner"><i class="fa-solid fa-crown"></i></span></div>
        <div class="element item2" v-if="betState"><p class="table-content">2</p></div>
        <div class="element item2" v-else><input type="number" class="input-score"></div>
        <div class="element item2"><p class="table-content">2</p></div>
        <div class="element item2 score"><p class="table-content">4000</p></div>
      </div>
      <div class="card">
        <div class="element"><p class="table-content1">Cray<span class="loser"><i class="fa-solid fa-ghost"></i></span></p></div>
        <div class="element" v-if="betState"><p class="table-content">2</p></div>
        <div class="element" v-else><input type="number" class="input-score"></div>
        <div class="element"><p class="table-content">2</p></div>
        <div class="element score"><p class="table-content">-40</p></div>
      </div>
      <!-- <div class="card">
        <div class="element"><p class="table-content1">Kelly</p><span class="loser"><i class="fa-solid fa-ghost"></i></span></div>
        <div class="element"><p class="table-content">2</p></div>
        <div class="element"><p class="table-content">2</p></div>
        <div class="element last score"><p class="table-content">400</p></div>
      </div> -->
    </div>
    <button class="btn" @click="setBet()">Set Bet</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'GolfView',
  components : {

  },
  setup() {
    const betState = ref(true)
    const getState = ref(false)

    const setBet = () => {
      betState.value = !betState.value
    }


    return { betState, getState, setBet }
  }
}
</script>

<style scoped> 

h5 {
  margin: 0;
}

.btn {
  background-color: var(--sidebar-bg-color);
  color: white;
  border: 1px solid var(--sidebar-bg-color);
  padding: 5px 15px;
  border-radius: 5px;
}

.btn:hover {
  border: 1px solid var(--sidebar-bg-color);
  background-color: white;
  color: var(--sidebar-bg-color);
}

.cards {
  background-color: #940101;
}

.card {
  /* background-color: rgb(205, 221, 221); */
  display: flex;
  gap: 1px;
  justify-content: space-between;
  margin-bottom: 0.3rem;

}

.element {
  position: relative;
  background-color: #dfeeee;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: black;
  /* min-width: 9rem; */
}

.item1 {
  flex-grow: 20;
  justify-content: start;
}

.item2 {
  flex-grow: 1;
}

.winner {
  position: absolute;
  right: 7px;
  font-size: 13px;
  color: #be9200;
  /* color: var(--sidebar-item-active); */
}

.loser {
  position: absolute;
  right: 7px;
  font-size: 13px;
  color: #b30000;
  /* color: var(--sidebar-item-active); */
}

.title-table {
  background-color: var(--sidebar-bg-color); 
  color: white;
}

.table-content1 {
  
  text-align: start;
  font-weight: 700;
  padding-left: 10px;
}

.table-content {
  min-width: 4rem;
}

.score {
  font-weight: 700;
  /* background-color: rgb(45, 231, 129); */
}

.first {
  color: #be9200;
}

.input-score {
  margin: 0;
  padding: 0;
  width: 3.73rem;
}

</style>