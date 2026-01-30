import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import DevicesView from '@/views/DevicesView.vue'
import ShipmentsView from '@/views/ShipmentsView.vue'
import QuotationsView from '@/views/QuotationsView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView,
  },
  {
    path: '/devices',
    name: 'Devices',
    component: DevicesView,
  },
  {
    path: '/shipments',
    name: 'Shipments',
    component: ShipmentsView,
  },
  {
    path: '/quotations',
    name: 'Quotations',
    component: QuotationsView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router