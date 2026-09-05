<template>
  <div class="overview-container">
    <!-- Header Section -->
    <div class="overview-header">
      <div>
        <h1 class="page-title">Overview</h1>
        <p class="subtitle">Welcome back to your technical dashboard, {{ user.role }}.</p>
      </div>
      <button class="btn-black" @click="viewActiveOrders">View Active Orders</button>
    </div>

    <!-- Stats Cards Grid -->
    <div class="stats-grid">
      <!-- Recent Orders Card -->
      <div class="stat-card">
        <div class="card-header">
          <span>Recent Orders</span>
          <svg class="icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M21 8l-2-1H5L3 8v10a2 2 0 002 2h14a2 2 0 002-2V8z"></path>
            <path d="M3 8l9 6 9-6"></path>
          </svg>
        </div>
        <div class="stat-value">{{ stats.recentOrders.count }}</div>
        <div class="stat-subtext text-muted">
          <span class="status-dot green"></span>
          {{ stats.recentOrders.delivered }} DELIVERED, {{ stats.recentOrders.inTransit }} IN TRANSIT
        </div>
      </div>

      <!-- Saved Addresses Card -->
      <div class="stat-card">
        <div class="card-header">
          <span>Saved Addresses</span>
          <svg class="icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <div class="stat-value">{{ stats.savedAddresses.count }}</div>
        <div class="stat-subtext text-muted">
          {{ stats.savedAddresses.locations }}
        </div>
      </div>

      <!-- Wishlist Items Card -->
      <div class="stat-card">
        <div class="card-header">
          <span>Wishlist Items</span>
          <svg class="icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
          </svg>
        </div>
        <div class="stat-value">{{ stats.wishlistItems.count }}</div>
        <div class="stat-subtext text-danger">
          <span class="alert-icon">▲</span>
          {{ stats.wishlistItems.lowStockCount }} ITEMS LOW IN STOCK
        </div>
      </div>
    </div>

    <!-- Main Content Section (Activity + Account Status) -->
    <div class="content-grid">
      <!-- Recent Activity Section -->
      <div class="activity-section">
        <h2 class="section-title">Recent Activity</h2>
        <div class="activity-list">
          <div 
            v-for="activity in recentActivities" 
            :key="activity.id" 
            class="activity-card"
          >
            <div class="activity-icon-wrapper">
              <svg v-if="activity.type === 'shipping'" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
              <svg v-else-if="activity.type === 'security'" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0110 0v4"></path>
              </svg>
              <svg v-else viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
            </div>
            <div class="activity-details">
              <div class="activity-header">
                <h3 class="activity-title">{{ activity.title }}</h3>
                <span class="activity-time">{{ activity.time }}</span>
              </div>
              <p class="activity-description">{{ activity.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Account Status Sidebar Box -->
      <div class="account-status-box">
        <h2 class="status-box-title">Account Status</h2>
        <div class="status-details">
          <div class="status-row">
            <span class="label">TIER</span>
            <span class="value font-bold">{{ accountStatus.tier }}</span>
          </div>
          <div class="status-row">
            <span class="label">CREDIT LIMIT</span>
            <span class="value font-bold">${{ accountStatus.creditLimit.toLocaleString() }}.00</span>
          </div>
          <div class="status-row">
            <span class="label">TERMS</span>
            <span class="value font-bold">{{ accountStatus.terms }}</span>
          </div>
        </div>
        <button class="btn-outline full-width" @click="requestLimitIncrease">
          Request Limit Increase
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileOverviewView',
  data() {
    return {
      user: {
        role: 'System Admin'
      },
      stats: {
        recentOrders: {
          count: '03',
          delivered: 2,
          inTransit: 1
        },
        savedAddresses: {
          count: '02',
          locations: 'HQ & WAREHOUSE B'
        },
        wishlistItems: {
          count: '14',
          lowStockCount: 3
        }
      },
      accountStatus: {
        tier: 'ENTERPRISE GOLD',
        creditLimit: 50000,
        terms: 'NET 30'
      },
      recentActivities: [
        {
          id: 1,
          type: 'shipping',
          title: 'Order #TS-992-A Shipped',
          time: '2 HOURS AGO',
          description: 'Your order containing Industrial Server Rack 42U is now in transit via Freight.'
        },
        {
          id: 2,
          type: 'security',
          title: 'Security Settings Updated',
          time: 'YESTERDAY',
          description: 'Two-factor authentication (2FA) was successfully enabled for this account.'
        },
        {
          id: 3,
          type: 'invoice',
          title: 'Invoice Available',
          time: 'OCT 12',
          description: 'Invoice for Order #TS-991-B is now available for download.'
        }
      ]
    }
  },
  methods: {
    viewActiveOrders() {
      this.$router.push('/orders');
    },
    requestLimitIncrease() {
      console.log('Limit increase requested');
    }
  }
}
</script>

<style scoped>
.overview-container {
  padding: 32px 40px;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1a1a1a;
}

.overview-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 6px 0;
}

.subtitle {
  color: #666666;
  font-size: 14px;
  margin: 0;
}

.btn-black {
  background-color: #000000;
  color: #ffffff;
  border: none;
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
}

.btn-black:hover {
  background-color: #333333;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 36px;
}

.stat-card {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 20px;
  background-color: #ffffff;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
}

.icon {
  color: #a0a0a0;
}

.stat-value {
  font-size: 42px;
  font-weight: 700;
  margin: 12px 0;
  letter-spacing: -1px;
}

.stat-subtext {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.text-muted {
  color: #666666;
}

.text-danger {
  color: #dc2626;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-dot.green {
  background-color: #16a34a;
}

.alert-icon {
  font-size: 10px;
}

/* Content Layout (Activities + Status) */
.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.section-title, .status-box-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-card {
  display: flex;
  gap: 16px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 16px 20px;
  background-color: #ffffff;
}

.activity-icon-wrapper {
  background-color: #f3f4f6;
  width: 38px;
  height: 38px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #374151;
  flex-shrink: 0;
}

.activity-details {
  flex-grow: 1;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.activity-title {
  font-size: 15px;
  font-weight: 600;
  margin: 0;
}

.activity-time {
  font-size: 11px;
  font-weight: 600;
  color: #888888;
  letter-spacing: 0.5px;
}

.activity-description {
  font-size: 13px;
  color: #666666;
  margin: 0;
}

/* Account Status Box */
.account-status-box {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 20px;
  background-color: #fafafa;
  height: fit-content;
}

.status-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.status-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.status-row .label {
  color: #666666;
  letter-spacing: 0.5px;
}

.font-bold {
  font-weight: 700;
  color: #1a1a1a;
}

.btn-outline {
  background-color: transparent;
  color: #000000;
  border: 1px solid #000000;
  padding: 10px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-outline:hover {
  background-color: #f0f0f0;
}

.full-width {
  width: 100%;
}
</style>