<template>
  <router-link :to="to" class="link" :class="{ active: isActive }">
    <i class="icon" :class="icon" />
    <transition name="fade">
        <span v-if="!collapsed">
            <slot />
        </span>
    </transition>
  </router-link>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { collapsed } from './State'


export default {
    props: {
        to: { type: String, required: true},
        icon: { type: String, required: true}
    },
    setup (props) {
        const route = useRouter()
        const isActive = computed(() => route.path === props.to)

        return { isActive, collapsed }
    }
}
</script>

<style scoped>
.link {
    display: flex;
    align-items: center;

    cursor: pointer;
    position: relative;
    font-weight: 400;
    user-select: none;

    margin: 0.1rem 0;
    padding: 0.4rem;
    border-radius: 0.25rem;
    height: 1.5rem;

    color: white;
    text-decoration: none;
}

.link:hover {
    background-color: var(--sidebar-item-hover);
}

.router-link-active.router-link-exact-active.link{
    background-color: var(--sidebar-item-active);
}

.link .icon {
    flex-shrink: 0;
    width: 25px;
    margin-right: 10px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>