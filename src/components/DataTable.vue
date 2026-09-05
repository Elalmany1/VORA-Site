<template>
  <div class="table-container">
    <div class="table-header" v-if="title">
      <h3>{{ title }}</h3>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="(col, index) in columns" :key="index">{{ col.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td v-for="(col, colIndex) in columns" :key="colIndex">
            {{ row[col.field] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    title: String,
    columns: Array, // أسماء الأعمدة [{label: 'Product', field: 'name'}]
    data: Array     // البيانات [{name: 'CPU-i9', price: '$500'}]
  }
}
</script>

<style scoped>
.table-container {
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  margin-bottom: 25px;
}
.table-header {
  padding: 15px 20px;
  border-bottom: 1px solid #e5e7eb;
}
.table-header h3 {
  margin: 0;
  font-size: 16px;
  color: #111827;
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
th {
  background-color: #f9fafb;
  color: #6b7280;
  padding: 12px 20px;
  font-size: 12px;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
}
td {
  padding: 14px 20px;
  color: #374151;
  font-size: 14px;
  border-bottom: 1px solid #e5e7eb;
}
tr:last-child td {
  border-bottom: none;
}
</style>