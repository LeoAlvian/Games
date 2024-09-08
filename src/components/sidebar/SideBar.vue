<template>
    <div class="sidebar" :style="{ width: sidebarWidth }">

        <h1>
            <span v-if="collapsed" class="app-name">
                <div>G</div>
                <div>A</div>
            </span>
            <span v-else class="app-name">
                Games Application
            </span>
        </h1>

        <!-- <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink>
        <SidebarLink to="/dashboard" icon="fas fa-columns">Dashboard</SidebarLink>
        <SidebarLink to="/analytics" icon="fas fa-chart-bar">Analytics</SidebarLink>
        <SidebarLink to="/friends" icon="fas fa-users">Friends</SidebarLink>
        <SidebarLink to="/image" icon="fas fa-image">Images</SidebarLink> -->

        <SidebarLink to="/" icon="fas fa-chart-bar">Dashboard</SidebarLink>
        <SidebarLink to="/wizard" icon="fas fa-hat-wizard">Wizard</SidebarLink>
        <SidebarLink to="/fivecrowns" icon="fas fa-chess-queen">5 Crowns</SidebarLink>
        <SidebarLink to="/golf" icon="fas fa-diamond">Golf</SidebarLink>
        <!-- <SidebarLink to="/friends" icon="fas fa-users">Friends</SidebarLink> -->

        <span 
        class="collapse-icon"
        :class="{ 'rotate-180' : collapsed }"
        @click="toggleSidebar">
            <font-awesome-icon :icon="['fas', 'angles-left']" /> 
        </span>

    </div>    
</template>

<script>

import { collapsed, toggleSidebar, sidebarWidth } from './State'
import SidebarLink from './SidebarLink.vue'


export default {
    props: {},
    components: { SidebarLink },
    setup() {

        return { collapsed, toggleSidebar, sidebarWidth }
    }
}
</script>

<style scoped>
 .sidebar {
    color: white;
    background-color: var(--sidebar-bg-color);

    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: .5rem;

    transition: 0.3s ease;

    display: flex;
    flex-direction: column;
 }


 .collapse-icon {
    position: absolute;
    bottom: 0;
    padding: 0.75rem;
    cursor: pointer;

    color: rgba(255, 255, 255, 0.6);

    transition: 0.2s linear;
 }

 .collapse-icon:hover {
    color: white;
 }

 .rotate-180 {
    transform: rotate(180deg);
    transition: 0.2s linear;
 }
</style>