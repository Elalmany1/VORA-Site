<template>
  <div class="chart-card">
    <div class="chart-header">
      <div>
        <h3>Revenue vs Orders Trend</h3>
        <p class="subtitle">Overview of commercial performance metrics</p>
      </div>
    </div>
    
    <!-- الرسم البياني باستخدام SVG -->
    <div class="chart-body">
      <svg viewBox="0 0 500 150" class="chart-svg">
        <!-- خطوط الشبكة الخلفية -->
        <line x1="0" y1="30" x2="500" y2="30" stroke="#f3f4f6" stroke-width="1" />
        <line x1="0" y1="75" x2="500" y2="75" stroke="#f3f4f6" stroke-width="1" />
        <line x1="0" y1="120" x2="500" y2="120" stroke="#f3f4f6" stroke-width="1" />

        <!-- منحنى البيانات -->
        <path
          d="M 0 100 Q 80 30, 160 80 T 320 40 T 500 20"
          fill="none"
          stroke="#2563eb"
          stroke-width="3"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SalesChart'
}
</script>

<style scoped>
.chart-card {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  margin-bottom: 25px;
}
.chart-header h3 {
  margin: 0;
  font-size: 16px;
  color: #111827;
}
.subtitle {
  margin: 4px 0 15px 0;
  font-size: 12px;
  color: #6b7280;
}
.chart-body {
  width: 100%;
  height: 160px;
}
.chart-svg {
  width: 100%;
  height: 100%;
}
</style>