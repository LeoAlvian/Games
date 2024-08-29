import { ref, computed, watch } from 'vue'

export const collapsed = ref(false)
export const toggleSidebar = () => (collapsed.value = !collapsed.value)

export const SIDEBAR_WIDTH = 180
export const SIDEBAR_WIDTH_COLLAPSED = 38
export const sidebarWidth = computed( () => 
`${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`)

const storageIsCollapsed = window.localStorage.getItem('isCollapsed')

if (storageIsCollapsed) {
    collapsed.value = JSON.parse(storageIsCollapsed)
}

watch(collapsed, (val) =>{
    window.localStorage.setItem('isCollapsed', JSON.stringify(val))
})
