<template>
  <div class="hero">
    Wizard

    <div v-if="!isPlayerSet" class="container-input-player">
      <h5>How many player</h5>
      <input type="number" required v-model="playerAmount">
      <button class="botton" @click="inputPlayer()">Set</button>
      <button class="botton" @click="setPlayer()">Play</button>
      <h5>{{ warning }}</h5>
      <h5>{{ players }}</h5>
      <h5>{{ playerAmount }}</h5>
      <div class="" v-for="(p, i) in players" :key="i">
        <input type="text" class="container-input" v-model="players[i]">
      </div>
    </div>
    <div v-else class="wizard-container">
      <div class="box">
        <!-- <h5>{{ playersDataTemp }}</h5> -->
        <div class="gridTable">
            <h5>Name</h5>
            <h5>Bet</h5>
            <h5>Get</h5>
            <h5>Score</h5>
        </div>
        <div class="" v-for="(p, i) in playersDataTemp" :key="i">
          <div class="gridTable">
            <p for="Name" class="first-column">{{ p.name }}</p>
            <input class="betGetInput second-column" type="number" v-model="p.set">
            <input class="betGetInput third-column" type="number" v-model="p.get">
            <p for="Score" class="forth-column">{{ p.score }}</p>
          </div>
        </div>
        <button @click="setBet()">Set Bet</button>
        <button @click="calculateScore()">Submit</button>
      </div>
      <div class="cards">
        <div class="card">
          <div class="element title-table"><h5 class="table-content1">Name</h5></div>
          <div class="element title-table"><h5 class="table-content">Bet</h5></div>
          <div class="element title-table"><h5 class="table-content">Get</h5></div>
          <div class="element title-table"><h5 class="table-content">Score</h5></div>
        </div>
        <div class="card">
          <div class="element"><p class="table-content1">Leo</p><span class="winner"><i class="fa-solid fa-crown"></i></span></div>
          <div class="element"><p class="table-content">2</p></div>
          <div class="element"><p class="table-content">2</p></div>
          <div class="element score"><p class="table-content">40</p></div>
        </div>
        <div class="card">
          <div class="element"><p class="table-content1">Cray</p></div>
          <div class="element"><p class="table-content">2</p></div>
          <div class="element"><p class="table-content">2</p></div>
          <div class="element score"><p class="table-content">4000</p></div>
        </div>
        <div class="card">
          <div class="element"><p class="table-content1">Kelly</p><span class="loser"><i class="fa-solid fa-ghost"></i></span></div>
          <div class="element"><p class="table-content">2</p></div>
          <div class="element"><p class="table-content">2</p></div>
          <div class="element last score"><p class="table-content">400</p></div>
        </div>
    </div>
    </div>
    <button @click="clearLocal()">End Game</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'WizardView',
  components : {

  },
  setup () {

    const isPlayerSet = ref(localStorage.getItem('isPlayerSet') ? JSON.parse(localStorage.getItem('isPlayerSet')) : false)
    const isBetSet = ref(true)
    const isGetSet = ref(false)

    const playerAmount = ref(0)
    const warning = ref('')
    const players = ref([])
    const round = ref(0)
    const playersDataTemp = ref( localStorage.getItem('tempPlayer') ? JSON.parse(localStorage.getItem('tempPlayer')) : [] )
    const playersData = ref(localStorage.getItem('players') ? JSON.parse(localStorage.getItem('players')) : [])
    // const playersData = ref(
    //   [ { "Name": "Leo", "Set": 0, "Get": 0, "Score": 0 }, { "Name": "Cray", "Set": 0, "Get": 0, "Score": 0 }, { "Name": "Tanya", "Set": 0, "Get": 0, "Score": 0 } ]
    // )

    const setPlayer = () => {
      if (playerAmount.value === 0) {
        warning.value = 'You must input player';
        return
      }
      for (let i=0; i<players.value.length; i++) {
        playersDataTemp.value.push({ name: players.value[i], set: 0, get: 0, score: 0})
        playersData.value.push({ name: players.value[i], set: [], get: [], score: []})
      }
      isPlayerSet.value = !isPlayerSet.value;
      localStorage.setItem('isPlayerSet', JSON.stringify(isPlayerSet.value))
      localStorage.setItem('players', JSON.stringify(playersData.value))
      localStorage.setItem('tempPlayer', JSON.stringify(playersDataTemp.value))
    }

    const inputPlayer = () => {
      players.value.length = playerAmount.value;
    }

    const addTempDataToPlayerArr = (playersData, temp) => {
      playersData.set.push(temp.set)
      playersData.get.push(temp.get)
      playersData.score.push(temp.score)
    }

    const calculateScore = () => {
      console.log( localStorage.getItem('players') ? "Yes" : "No" )
      for (let i=0; i<playersDataTemp.value.length; i++) {
        if (playersDataTemp.value[i].set === playersDataTemp.value[i].get) {
          console.log('Inside right score')

          // input data to temp player 
          playersDataTemp.value[i].score = playersDataTemp.value[i].score + ( 20 + (playersDataTemp.value[i].set * 10) )

          // input data to player array 
          addTempDataToPlayerArr(playersData.value[i], playersDataTemp.value[i])
          
        }
        else {
          console.log('Inside wrong score')

          playersDataTemp.value[i].score = playersDataTemp.value[i].score + ( -10 * Math.abs(playersDataTemp.value[i].set - playersDataTemp.value[i].get) )

          addTempDataToPlayerArr(playersData.value[i], playersDataTemp.value[i])
          
        }
      }
      window.localStorage.setItem('players', JSON.stringify(playersData.value))
      window.localStorage.setItem('tempPlayer', JSON.stringify(playersDataTemp.value))

      console.log('localVariable', JSON.parse(localStorage.getItem('players')))
      round.value += 1
      console.log('player data', playersData.value)
    }

    const setBet = () => {
      for (let player of playersDataTemp.value) {
        player.get = player.set
        localStorage.setItem('tempPlayer', JSON.stringify(playersDataTemp.value))
        isBetSet.value = !isBetSet.value
        isGetSet.value = !isGetSet.value
      }
    }

    const clearLocal = () => {
      window.localStorage.removeItem('players')
      window.localStorage.removeItem('tempPlayer')

      isPlayerSet.value = !isPlayerSet.value;
      localStorage.removeItem('isPlayerSet')

      players.value = []
      playersData.value = []
      playersDataTemp.value = []
      playerAmount.value = 0
    }

    return { isPlayerSet,isBetSet, playerAmount, warning, players, playersDataTemp, playersData, setPlayer, inputPlayer, calculateScore, clearLocal, setBet }
  }

}
</script>

<style scoped>

.container-input {
  margin: .2rem;
}

h5 {
  /* margin: .3rem 0; */
  /* color: var(--sidebar-item-active) */
}

p {
  margin: 0;
  color: var(--sidebar-item-active)
}

/* .wizard-container {
  display: flex;
  justify-content: center;
} */

.box {
  width: 90%;
}

.first-column {
  grid-area: first;
}

.second-column {
  grid-area: second;
}

.third-column {
  grid-area: third;
}

.forth-column {
  grid-area: forth;
}

.gridTable {
  display: grid;
  grid-template-columns: repeat(4, 90px);
  grid-template-rows: auto;
  grid-template-areas: 
    "first second third forth";
  justify-items: start;
  margin: 0.4rem 0;
}



.betGetInput {
  width: 2rem;
  border: 2px solid var(--sidebar-bg-color);
  color: var(--sidebar-item-active);
  border-radius: 5px;
  font-weight: bold;
}

.betGetInput:focus {
  /* outline-color: yellow; */
}


/* New card style  */
.card {
  /* background-color: rgb(205, 221, 221); */
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3rem;

}

.element {
  position: relative;
  background-color: #dfeeee;
  height: 2rem;
  display: flex;
  align-items: center;
  border-radius: 5px;
  color: black;
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
  min-width: 9rem;
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

</style>