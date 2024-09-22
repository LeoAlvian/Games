<template>
  <div class="popup">
    <div class="popup-inner">
        <slot />
        <button @click="togglePopup()">Close Popup</button>
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
    align-items: center;
}

.popup-inner {
    background: white;
    padding: 2rem;
}

</style>