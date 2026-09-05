<template>
  <div class="orders-container">
    <h1 class="page-title">Order History</h1>
    <p class="subtitle">Review your past purchases and track current shipments.</p>

    <div class="orders-list">
      <div 
        v-for="order in orders" 
        :key="order.id" 
        class="order-card"
      >
        <div class="product-info">
          <img :src="order.image" :alt="order.title" class="product-img" />
          <div class="details">
            <div class="order-header">
              <span class="order-id">{{ order.code }}</span>
              <span class="status" :class="order.status.toLowerCase()">
                {{ order.status }}
              </span>
            </div>
            <h3 class="product-name">{{ order.title }}</h3>
            <p class="order-date">Ordered: {{ order.date }}</p>
          </div>
        </div>

        <div class="action-section">
          <span class="price">${{ order.price.toFixed(2) }}</span>
          <button 
            class="btn" 
            :class="order.status === 'PROCESSING' ? 'btn-black' : 'btn-outline'"
            @click="handleAction(order)"
          >
            {{ order.status === 'PROCESSING' ? 'View Details' : 'Invoice' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderHistoryView',
  data() {
    return {
      orders: [
        {
          id: 1,
          code: 'ORD-TS-9021',
          status: 'PROCESSING',
          title: 'Tactile Switch Pack (x72)',
          date: 'Oct 24, 2024',
          price: 45.00,
          image: 'https://via.placeholder.com/64'
        },
        {
          id: 2,
          code: 'ORD-TS-8843',
          status: 'DELIVERED',
          title: 'Reinforced Data Cable Type-C',
          date: 'Sep 12, 2024',
          price: 28.50,
          image: 'https://via.placeholder.com/64'
        }
      ]
    }
  },
  methods: {
    handleAction(order) {
      if (order.status === 'PROCESSING') {
        console.log('Viewing details for order:', order.code);
      } else {
        console.log('Downloading invoice for order:', order.code);
      }
    }
  }
}
</script>

<style scoped>
.orders-container {
  padding: 32px 40px;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1a1a1a;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 6px;
}

.subtitle {
  color: #666666;
  font-size: 14px;
  margin-bottom: 32px;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.order-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 20px;
  background-color: #fafafa;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.product-img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 6px;
  background-color: #eee;
}

.order-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.order-id {
  font-size: 12px;
  font-weight: 600;
  color: #666;
}

.status {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

.status.processing {
  background-color: #e0e7ff;
  color: #4338ca;
}

.status.delivered {
  background-color: #e5e7eb;
  color: #4b5563;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.order-date {
  font-size: 12px;
  color: #888;
  margin: 0;
}

.action-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.price {
  font-size: 14px;
  font-weight: 600;
}

.btn {
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-black {
  background-color: #000000;
  color: #ffffff;
  border: none;
}

.btn-black:hover {
  background-color: #333333;
}

.btn-outline {
  background-color: transparent;
  color: #000000;
  border: 1px solid #ccc;
}

.btn-outline:hover {
  background-color: #f0f0f0;
}
</style>