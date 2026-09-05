
<template>

    <AppHeader />

    <RouterView />
    <AdminLayout>
    <!-- صف الكروت الإحصائية -->
    <div class="stats-grid">
      <StatCard 
        title="TOTAL INVENTORY VALUE" 
        value="$1,245,000" 
        change="+12.5%" 
        :isPositive="true" 
      />
      <StatCard 
        title="STOCK TURN RATE" 
        value="4.20" 
        change="-2.1%" 
        :isPositive="false" 
      />
      <StatCard 
        title="RETURN RATE" 
        value="1.45%" 
        change="+0.3%" 
        :isPositive="true" 
      />
    </div>
  </AdminLayout>
</template>

<script>

import AppHeader from "./components/AppHeader.vue";
import AdminLayout from './components/AdminLayout.vue';
import StatCard from './components/StatCard.vue';

export default {
    components: {
        AppHeader,
        AdminLayout,
        StatCard
    },
};

</script>

<style scoped>
.stats-grid {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 25px;
}
</style>

<template>
  <AdminLayout>
    <!-- 1. الكروت -->
    <div class="stats-grid">
      <StatCard title="TOTAL INVENTORY VALUE" value="$1,245,000" change="+12.5%" :isPositive="true" />
      <StatCard title="STOCK TURN RATE" value="4.20" change="-2.1%" :isPositive="false" />
      <StatCard title="RETURN RATE" value="1.45%" change="+0.3%" :isPositive="true" />
    </div>

    <!-- 2. الجدول -->
    <DataTable 
      title="Top Moving SKUs (Fastest)" 
      :columns="tableColumns" 
      :data="tableData" 
    />
  </AdminLayout>
</template>

<script>
import AdminLayout from './components/AdminLayout.vue'
import StatCard from './components/StatCard.vue'
import DataTable from './components/DataTable.vue'

export default {
  components: {
    AdminLayout,
    StatCard,
    DataTable
  },
  data() {
    return {
      tableColumns: [
        { label: 'PRODUCT ID', field: 'id' },
        { label: 'STOCK', field: 'stock' },
        { label: 'VELOCITY / WK', field: 'velocity' },
        { label: 'STATUS', field: 'status' }
      ],
      tableData: [
        { id: 'TS-CPU-13900K', stock: '142', velocity: '4.5 Days', status: 'In Stock' },
        { id: 'TS-GPU-4090', stock: '28', velocity: '1.2 Days', status: 'Low Stock' },
        { id: 'TS-RAM-32GB', stock: '310', velocity: '6.0 Days', status: 'In Stock' }
      ]
    }
  }
}
</script>

<style scoped>
.stats-grid {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 25px;
}
</style>

<template>
  <AdminLayout>
    <!-- 1. الكروت -->
    <div class="stats-grid">
      <StatCard title="TOTAL INVENTORY VALUE" value="$1,245,000" change="+12.5%" :isPositive="true" />
      <StatCard title="STOCK TURN RATE" value="4.20" change="-2.1%" :isPositive="false" />
      <StatCard title="RETURN RATE" value="1.45%" change="+0.3%" :isPositive="true" />
    </div>

    <!-- 2. الرسم البياني -->
    <SalesChart />

    <!-- 3. الجدول -->
    <DataTable 
      title="Top Moving SKUs (Fastest)" 
      :columns="tableColumns" 
      :data="tableData" 
    />
  </AdminLayout>
</template>

<script>
import AdminLayout from './components/AdminLayout.vue'
import StatCard from './components/StatCard.vue'
import DataTable from './components/DataTable.vue'
import SalesChart from './components/SalesChart.vue'

export default {
  components: {
    AdminLayout,
    StatCard,
    DataTable,
    SalesChart
  },
  data() {
    return {
      tableColumns: [
        { label: 'PRODUCT ID', field: 'id' },
        { label: 'STOCK', field: 'stock' },
        { label: 'VELOCITY / WK', field: 'velocity' },
        { label: 'STATUS', field: 'status' }
      ],
      tableData: [
        { id: 'TS-CPU-13900K', stock: '142', velocity: '4.5 Days', status: 'In Stock' },
        { id: 'TS-GPU-4090', stock: '28', velocity: '1.2 Days', status: 'Low Stock' },
        { id: 'TS-RAM-32GB', stock: '310', velocity: '6.0 Days', status: 'In Stock' }
      ]
    }
  }
}
</script>

<style scoped>
.stats-grid {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 25px;
}
</style>