<template>
  <div class="stat-card">
    <div class="card-header">
      <span class="title">{{ title }}</span>
      <span class="icon" v-if="icon">{{ icon }}</span>
    </div>
    <div class="card-body">
      <h3 class="value">{{ value }}</h3>
      <span :class="['change', isPositive ? 'positive' : 'negative']" v-if="change">
        {{ change }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    title: String,      // عنوان الكرت (مثل: Total Inventory Value)
    value: String,      // الرقم (مثل: $1,245,000)
    change: String,     // نسبة التغير (مثل: +12.5%)
    isPositive: Boolean,// هل الزيادة بالموجب (خضراء) أم بالسالب (حمراء)
    icon: String        // أيقونة توضيحية
  }
}
</script>

<style scoped>
.stat-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  flex: 1;
  min-width: 200px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  color: #6b7280;
  font-size: 13px;
  font-weight: 500;
}
.card-body {
  margin-top: 10px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.value {
  font-size: 22px;
  font-weight: bold;
  color: #111827;
  margin: 0;
}
.change {
  font-size: 12px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
}
.positive {
  color: #10b981;
  background-color: #ecfdf5;
}
.negative {
  color: #ef4444;
  background-color: #fef2f2;
}
</style>