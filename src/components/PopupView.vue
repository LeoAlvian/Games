<template>
  <div class="popup">
    <div class="popup-inner">
        <slot />
        <button class="btn" @click="togglePopup()">Close Popup</button>
    </div>
  </div>
</template>

<script>
export default {
    props: ['togglePopup'],
    
}
</script>

<style scoped>

.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    padding: 0 2rem;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    justify-content: center;
    align-items: start;

    padding-top: 5rem;
}

.popup-inner {
    background: white;
    padding: 2rem;
}

.btn {
  background-color: var(--sidebar-bg-color);
  color: white;
  border: 1px solid var(--sidebar-bg-color);
  padding: 5px 15px;
  border-radius: 5px;
  margin: .5rem 2px;
  cursor: pointer;
}

.btn:hover {
  border: 1px solid var(--sidebar-bg-color);
  background-color: white;
  color: var(--sidebar-bg-color);
}

</style>