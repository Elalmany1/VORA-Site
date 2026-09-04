<template>
  <div class="container my-5" style="max-width: 900px;">
    <!-- Top Bar Navigation & Actions -->
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
      <router-link to="/orders" class="text-decoration-none text-dark fw-semibold d-flex align-items-center gap-1">
        ← Back to Order History
      </router-link>
      
      <div class="d-flex gap-2">
        <router-link to="/return-request" class="btn btn-outline-dark btn-sm px-3">
          Return / Issue
        </router-link>
        <button class="btn btn-dark btn-sm px-3" @click="downloadInvoice">
          Invoice 📄
        </button>
      </div>
    </div>

    <!-- Order Summary Card -->
    <div class="card p-4 border rounded shadow-sm bg-white mb-4">
      <div class="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-3 border-bottom pb-3">
        <div>
          <span class="badge bg-primary-subtle text-primary border border-primary-subtle mb-2">
            {{ orderDetails.id }}
          </span>
          <h4 class="fw-bold mb-1">{{ orderDetails.title }}</h4>
          <p class="text-muted small mb-0">Placed on {{ orderDetails.date }}</p>
        </div>
        <div class="text-end">
          <span class="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 mb-1">
            ● {{ orderDetails.status }}
          </span>
          <small class="text-muted d-block fs-6">Estimated Delivery: {{ orderDetails.deliveryEstimate }}</small>
        </div>
      </div>

      <!-- Items Table -->
      <h6 class="fw-bold mb-3">Items Purchased</h6>
      <div class="table-responsive">
        <table class="table align-middle">
          <thead class="table-light">
            <tr>
              <th scope="col">Item Description</th>
              <th scope="col" class="text-center">Qty</th>
              <th scope="col" class="text-end">Unit Price</th>
              <th scope="col" class="text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orderDetails.items" :key="item.id">
              <td>
                <div class="fw-bold">{{ item.name }}</div>
                <small class="text-muted">SKU: {{ item.sku }}</small>
              </td>
              <td class="text-center">{{ item.quantity }}</td>
              <td class="text-end">${{ item.price.toFixed(2) }}</td>
              <td class="text-end fw-semibold">${{ (item.quantity * item.price).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Payment & Shipping Details Grid -->
    <div class="row g-4">
      <!-- Shipping Address -->
      <div class="col-md-6">
        <div class="card p-3 border rounded shadow-sm bg-white h-100">
          <h6 class="fw-bold mb-2">Shipping Address</h6>
          <p class="mb-1 fw-semibold">{{ orderDetails.shipping.name }}</p>
          <p class="text-muted small mb-0">{{ orderDetails.shipping.address }}</p>
          <p class="text-muted small mb-0">{{ orderDetails.shipping.cityState }}</p>
        </div>
      </div>

      <!-- Payment Summary -->
      <div class="col-md-6">
        <div class="card p-3 border rounded shadow-sm bg-white h-100">
          <h6 class="fw-bold mb-3">Payment Summary</h6>
          <div class="d-flex justify-content-between small mb-1">
            <span class="text-muted">Subtotal</span>
            <span>${{ orderDetails.payment.subtotal.toFixed(2) }}</span>
          </div>
          <div class="d-flex justify-content-between small mb-1">
            <span class="text-muted">Shipping & Handling</span>
            <span>${{ orderDetails.payment.shipping.toFixed(2) }}</span>
          </div>
          <div class="d-flex justify-content-between small mb-2">
            <span class="text-muted">Tax</span>
            <span>${{ orderDetails.payment.tax.toFixed(2) }}</span>
          </div>
          <div class="d-flex justify-content-between border-top pt-2 fw-bold">
            <span>Total</span>
            <span>${{ orderDetails.payment.total.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const orderDetails = ref({
  id: '#TS-9021',
  title: 'Precision Micro-Actuator x2',
  date: 'Oct 24, 2024',
  status: 'SHIPPED',
  deliveryEstimate: 'Oct 28, 2024',
  items: [
    {
      id: 1,
      name: 'Precision Micro-Actuator v2',
      sku: 'ACT-902-X',
      quantity: 2,
      price: 600.00
    },
    {
      id: 2,
      name: 'Standard Mounting Hardware Kit',
      sku: 'MNT-001',
      quantity: 1,
      price: 40.00
    }
  ],
  shipping: {
    name: 'Lab Facilities Manager',
    address: 'Faculty of Computers and Information',
    cityState: 'Damietta University, Egypt'
  },
  payment: {
    subtotal: 1240.00,
    shipping: 15.00,
    tax: 0.00,
    total: 1255.00
  }
})

const downloadInvoice = () => {
  alert('Downloading invoice PDF...')
}
</script>