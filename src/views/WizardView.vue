<template>
  <div class="hero">
    <h2>Wizard</h2> 

    <div v-if="!isPlayerSet" class="container-input-player">
      <h5>How many player</h5>
      <div class="player-set">
        <input type="number" class="input-player" required v-model="playerAmount">
        <button class="btn" @click="inputPlayer()">Set Player</button>
      </div>
      <!-- <h5>{{ warning }}</h5>
      <h5>{{ players }}</h5>
      <h5>{{ playerAmount }}</h5> -->
      <div class="" v-for="(p, i) in players" :key="i">
        <input type="text" class="container-input" v-model="players[i]">
      </div>
      <button class="btn play" @click="setPlayer()">Play</button>
    </div>
    <div v-else class="wizard-container">
      <div class="info">
        <h4>Round : {{ round }}</h4>
        <h4>Total Bet : {{ betTotal }}</h4>
      </div>
      <div class="cards">
        <div class="card">
          <div class="element item1 title-table"><h5 class="table-content1">Name</h5></div>
          <div class="element item2 title-table"><h5 class="table-content">Bet</h5></div>
          <div class="element item2 title-table"><h5 class="table-content">Get</h5></div>
          <div class="element item2 title-table"><h5 class="table-content">Score</h5></div>
        </div>
      </div>
      <transition-group name="list" tag="div" class="cards">
        <div class="card" v-for="(p, i) in orderedScore" :key="p.name">
          <!-- Name  -->
          <div class="element item1"><p class="table-content1">{{ i + 1 }}. {{ p.name }}</p>
            <div class="" v-if="round > 1">
              <span v-if="p.score === orderedScore[0].score" class="winner"><i class="fa-solid fa-crown"></i></span>
              <span v-if="p.score === orderedScore[orderedScore.length - 1].score" class="loser"><i class="fa-solid fa-ghost"></i></span>
            </div>
          </div>
          <!-- Bet  -->
          <!-- <div class="element item2" v-if="isBetSet">
            <input type="number" class="input-score" v-model="p.set">
          </div> -->
          <div class="element item2"><p class="table-content">{{ p.set }}</p></div>
          <!-- Get  -->
          <div class="element item2" v-if="isGetSet">
            <input type="number" class="input-score" v-model="p.get">
          </div>
          <div class="element item2" v-else><p class="table-content">{{ p.get }}</p></div>
          <!-- Score  -->
          <div class="element item2 score"><p class="table-content">{{ p.score }}</p></div>
        </div>
      </transition-group>
      <div class="bottom-btn">
        <div class="submit-container">
          <button class="btn" @click="togglePopup(), calculateBet()">Set Bet</button>
          <button class="btn" @click="togglePopup(), copyBetToGet()">Submit</button>
        </div>
        <button class="btn endgame" @click="toggleEndGame()">End Game</button>
      </div>
      <!-- <button class="btn" @click="togglePopup()">Open Popup</button> -->
    </div>

    <!-- Popup EndGame  -->
     <PopupView v-if="endGameTrigger" :toggleEndGame="() => toggleEndGame()">
      <h2>Want to end the game?</h2>
      <button class="btn endgame" @click="clearLocal()">End</button>
      <button class="btn" @click="toggleEndGame()">Cancel</button>
     </PopupView>

    <!-- Popup  -->
    <PopupView v-if="buttonPopupTrigger" :togglePopup="() => togglePopup()" :setBet="() => setBet()">
      <div class="" v-if="!isBetSet">
        <h1>Bet</h1>
        <div class="card" v-for="(p, i) in playersDataTemp" :key="p.name">
          <!-- Name  -->
          <div class="element item1 popup-name"><p class="table-content1">{{ i + 1 }}. {{ p.name }}</p>
          </div>
          <!-- Bet -->
          <div class="element item2">
            <div class="" v-if="p.set === 0">
              <button class="muted"><i class="fa-solid fa-minus"></i></button>
            </div>
            <div class="" v-else>
              <button @click="p.set --, betTotal --" class="add minus"><i class="fa-solid fa-minus"></i></button>
            </div>
            <input type="number" class="input-score" v-model="p.set">
            <button @click="p.set ++, betTotal ++" class="add plus"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
        <h4>Total Bet : {{ betTotal }}</h4>
        <button class="btn" @click="setBet(), togglePopup()">Set Bet</button>
      </div>
      <div class="" v-else>
        <h1>Get</h1>
        <div class="card" v-for="(p, i) in playersDataTemp" :key="p.name">
          <!-- Name  -->
          <div class="element item1 popup-name"><p class="table-content1">{{ i + 1 }}. {{ p.name }}</p>
          </div>
          <!-- Bet -->
          <div class="element item2">
            <div class="" v-if="p.get === 0">
              <button class="muted"><i class="fa-solid fa-minus"></i></button>
            </div>
            <div class="" v-else>
              <button @click="p.get --" class="add minus"><i class="fa-solid fa-minus"></i></button>
            </div>
            <input type="number" class="input-score" v-model="p.get">
            <button @click="p.get ++" class="add plus"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
        <button class="btn" @click="calculateScore(), togglePopup()">Submit</button>
      </div>
    </PopupView>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import PopupView from '@/components/PopupView.vue';

export default {
  name: 'WizardView',
  components : {
    PopupView,
  },
  setup () {

    const isPlayerSet = ref(localStorage.getItem('isPlayerSet') ? JSON.parse(localStorage.getItem('isPlayerSet')) : false)
    const isBetSet = ref(false)
    const isGetSet = ref(false)

    const playerAmount = ref(0)
    const warning = ref('')
    const players = ref([])
    const round = ref(localStorage.getItem('round') ? JSON.parse(localStorage.getItem('round')) : 1)
    const betTotal = ref(0)
    const playersDataTemp = ref( localStorage.getItem('tempPlayer') ? JSON.parse(localStorage.getItem('tempPlayer')) : [] )
    const playersData = ref(localStorage.getItem('players') ? JSON.parse(localStorage.getItem('players')) : [])
    const buttonPopupTrigger = ref(false)
    const endGameTrigger = ref(false)
    // const playersData = ref(
    //   [ { "Name": "Leo", "Set": 0, "Get": 0, "Score": 0 }, { "Name": "Cray", "Set": 0, "Get": 0, "Score": 0 }, { "Name": "Tanya", "Set": 0, "Get": 0, "Score": 0 } ]
    // )

    const togglePopup = () => {
      buttonPopupTrigger.value = !buttonPopupTrigger.value
    }

    const toggleEndGame = () => {
      endGameTrigger.value = !endGameTrigger.value
    }


    const setPlayer = () => {
      if (playerAmount.value === 0) {
        warning.value = 'You must input player';
        return
      }
      for (let i=0; i<players.value.length; i++) {
        playersDataTemp.value.push({ name: players.value[i], set: 0, get: 0, score: 0})
        playersData.value.push({ name: players.value[i], set: [], get: [], score: []})
      }
      console.log('players', players)
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
      isBetSet.value = !isBetSet.value
      // isGetSet.value = !isGetSet.value

      console.log('localVariable', JSON.parse(localStorage.getItem('players')))
      round.value += 1
      window.localStorage.setItem('round', JSON.stringify(round.value))
      betTotal.value = 0
      console.log('player data', playersData.value)
    }

    const orderedScore = computed(() => {
      return [...playersDataTemp.value].sort((a, b) => {
        return a.score < b.score ? 1 : -1
      })
    })

    const setBet = () => {
      localStorage.setItem('tempPlayer', JSON.stringify(playersDataTemp.value))
      isBetSet.value = !isBetSet.value
    }

    const copyBetToGet = () => {
      for (let player of playersDataTemp.value) {
        player.get = player.set
      }
    }

    const calculateBet = () => {
      betTotal.value = 0
      isBetSet.value = false
      for (let player of playersDataTemp.value) {
        player.set = 0
        player.get = 0
      }
      for (let player of playersDataTemp.value) {
        betTotal.value += player.set
      }
    }

    const clearLocal = () => {
      window.localStorage.removeItem('players')
      window.localStorage.removeItem('tempPlayer')
      window.localStorage.removeItem('round')

      isPlayerSet.value = !isPlayerSet.value;
      localStorage.removeItem('isPlayerSet')

      players.value = []
      playersData.value = []
      playersDataTemp.value = []
      playerAmount.value = 0
      round.value = 1
      endGameTrigger.value = !endGameTrigger.value
    }

    return { isPlayerSet,isBetSet, isGetSet, playerAmount, warning, players, playersDataTemp, playersData, orderedScore, buttonPopupTrigger, endGameTrigger, round, betTotal, setPlayer, inputPlayer, calculateScore, clearLocal, setBet, togglePopup, calculateBet, toggleEndGame,copyBetToGet }
  }

}
</script>

<style scoped>

.container-input {
  margin: .2rem 0;
  padding: 0;
  border: 1px solid var(--sidebar-bg-color);
  border-radius: 2px;
  height: 20px;
  font-size: 16px;
  text-align: center;
}

h2 {
  color: var(--sidebar-item-active)
}

p {
  margin: 0;
  /* color: var(--sidebar-item-active) */
}

.btn {
  background-color: var(--sidebar-bg-color);
  color: white;
  border: 1px solid var(--sidebar-bg-color);
  padding: 5px 15px;
  border-radius: 5px;
  margin: 0 2px;
  cursor: pointer;
}

.endgame {
  background-color: white;
  border: 1px solid var(--sidebar-bg-color);
  color: var(--sidebar-bg-color);
}

.btn:hover {
  border: 1px solid var(--sidebar-bg-color);
  background-color: white;
  color: var(--sidebar-bg-color);
}

.play {
  margin-top: 1rem;
}

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



/* .betGetInput {
  width: 2rem;
  border: 2px solid var(--sidebar-bg-color);
  color: var(--sidebar-item-active);
  border-radius: 5px;
  font-weight: bold;
} */

.betGetInput:focus {
  /* outline-color: yellow; */
}

.info {
  display: flex;
  justify-content: space-evenly;
  border: 2px solid var(--sidebar-bg-color);
  margin: 0.5rem 0;
  border-radius: 5px;
}

.info > h4 {
  margin: 0.8rem 0;
  color: var(--sidebar-bg-color);
}


/* New card style  */
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
  /* color: black; */
  color: var(--sidebar-item-active)
  /* min-width: 9rem; */
}

.popup-name {
  padding-right: 4rem;
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
  bottom: 7px;
  font-size: 13px;
  color: #be9200;
  /* color: var(--sidebar-item-active); */
}

.loser {
  position: absolute;
  right: 7px;
  bottom: 7px;
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
  border: 1px solid var(--sidebar-bg-color);
  border-radius: 2px;
  height: 20px;
  text-align: center;
}

.input-player {
  margin: 0 0.1rem;
  padding: 0.12rem 0;
  width: 6rem;
  border: 1px solid var(--sidebar-bg-color);
  border-radius: 2px;
  height: 20px;
  font-size: 16px;
  text-align: center;
}

/* .arrow-container {
  display: flex;
  flex-direction: column;
  margin-left: 0.2rem;
}

.arrow {
  cursor: pointer
} */

.submit-container {
  display: flex;
  justify-content: center;
  margin: 0.8rem 0;
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

.add {
  padding: .2rem .3rem;
  margin: 0 .2rem;
  border-radius: 5px;
  background-color: var(--sidebar-bg-color);
  border: none;
  cursor: pointer;
}

.plus {
  color: white;
}

.minus {
  color: white;
}

.muted {
  padding: .2rem .3rem;
  margin: 0 .2rem;
  border-radius: 5px;
  background-color: #686868;
  color: #ffffff;
  border: none;
}

</style>