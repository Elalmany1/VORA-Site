<template>
  <div class="container my-5" style="max-width: 900px;">
    <!-- Header -->
    <div class="mb-4">
      <h2 class="fw-bold mb-1">Order History</h2>
      <p class="text-muted">Manage and track your technical procurements.</p>
    </div>

    <!-- Navigation Tabs -->
    <ul class="nav nav-tabs mb-4">
      <li class="nav-item" v-for="tab in tabs" :key="tab.id">
        <button 
          class="nav-link text-dark" 
          :class="{ 'active fw-bold border-bottom border-dark border-2': activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </li>
    </ul>

    <!-- Search Bar -->
    <div class="mb-4 d-flex justify-content-end">
      <div class="input-group" style="max-width: 300px;">
        <span class="input-group-text bg-white border-end-0">🔍</span>
        <input 
          type="text" 
          class="form-control border-start-0" 
          placeholder="Search orders..." 
          v-model="searchQuery"
        >
      </div>
    </div>

    <!-- Orders List -->
    <div class="d-flex flex-column gap-3">
      <div 
        v-for="order in filteredOrders" 
        :key="order.id" 
        class="card p-3 shadow-sm border bg-white"
      >
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <!-- Left: Product Image & Details -->
          <div class="d-flex align-items-center gap-3">
            <div class="bg-light border rounded p-2" style="width: 70px; height: 70px;">
              <img src="https://via.placeholder.com/60" :alt="order.title" class="img-fluid" />
            </div>
            <div>
              <div class="d-flex align-items-center gap-2 mb-1">
                <span class="badge bg-primary-subtle text-primary border border-primary-subtle">{{ order.orderNumber }}</span>
                <span 
                  class="badge" 
                  :class="{
                    'bg-success-subtle text-success border border-success-subtle': order.status === 'SHIPPED',
                    'bg-secondary-subtle text-secondary border border-secondary-subtle': order.status === 'DELIVERED',
                    'bg-danger-subtle text-danger border border-danger-subtle': order.status === 'CANCELLED'
                  }"
                >
                  {{ order.status }}
                </span>
              </div>
              <h6 class="fw-bold mb-1">{{ order.title }}</h6>
              <small class="text-muted">Placed: {{ order.date }}</small>
            </div>
          </div>

          <!-- Right: Price & View Details Button -->
          <div class="text-end ms-auto">
            <small class="text-muted d-block">Total</small>
            <span class="fw-bold fs-5 d-block mb-2">${{ order.total.toFixed(2) }}</span>
            <router-link :to="`/orders/${order.id}`" class="btn btn-outline-dark btn-sm px-3">
              View Details
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('all')
const searchQuery = ref('')

const tabs = [
  { id: 'all', name: 'All Orders' },
  { id: 'active', name: 'Active' },
  { id: 'completed', name: 'Completed' },
  { id: 'cancelled', name: 'Cancelled' }
]

const orders = ref([
  {
    id: 'TS-9021',
    orderNumber: '#TS-9021',
    title: 'Precision Micro-Actuator x2',
    date: 'Oct 24, 2024',
    total: 1240.00,
    status: 'SHIPPED',
    category: 'active'
  },
  {
    id: 'TS-8843',
    orderNumber: '#TS-8843',
    title: 'Telemetry Sensor Array v4',
    date: 'Sep 12, 2024',
    total: 850.50,
    status: 'DELIVERED',
    category: 'completed'
  },
  {
    id: 'TS-8189',
    orderNumber: '#TS-8189',
    title: 'Heavy-Duty Mounting Brackets x12',
    date: 'Aug 05, 2024',
    total: 320.00,
    status: 'CANCELLED',
    category: 'cancelled'
  }
])

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesTab = activeTab.value === 'all' || order.category === activeTab.value
    const matchesSearch = order.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          order.orderNumber.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesTab && matchesSearch
  })
})
</script>