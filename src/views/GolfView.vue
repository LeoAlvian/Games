<template>
  <div class="hero-golf">
    Golf

    <div class="cards">
      <div class="card">
        <div class="element title-table"><h5 class="table-content1">Name</h5></div>
        <div class="element title-table"><h5 class="table-content">Bet</h5></div>
        <div class="element title-table"><h5 class="table-content">Get</h5></div>
        <div class="element title-table"><h5 class="table-content">Score</h5></div>
      </div>
      <div class="card">
        <div class="element"><p class="table-content1">Leo</p><span class="winner">winner</span></div>
        <div class="element"><p class="table-content">2</p></div>
        <div class="element"><p class="table-content">2</p></div>
        <div class="element first score"><p class="table-content">40</p></div>
      </div>
      <div class="card">
        <div class="element"><p class="table-content1">Cray</p></div>
        <div class="element"><p class="table-content">2</p></div>
        <div class="element"><p class="table-content">2</p></div>
        <div class="element score"><p class="table-content">4000</p></div>
      </div>
      <div class="card">
        <div class="element"><p class="table-content1">Kelly</p></div>
        <div class="element"><p class="table-content">2</p></div>
        <div class="element"><p class="table-content">2</p></div>
        <div class="element last score"><p class="table-content">400</p></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

h5 {
  margin: 0;
}

.cards {
  /* background-color: rgb(206, 214, 204); */
}

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
}

.winner {
  position: absolute;
  right: 5px;
  font-size: 10px;
  background-color: #00ffff;
  color: var(--sidebar-item-active);
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

.first {
  color: rgb(216, 166, 0);
}

.last {
  /* color: red; */
}

</style>