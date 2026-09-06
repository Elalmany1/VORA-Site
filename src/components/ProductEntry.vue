<script setup>
import { ref } from 'vue'

// 1. Initial product list
const products = ref([
  { id: 1, title: 'Cotton T-Shirt', price: 250, category: 'Clothing', stock: 15 },
  { id: 2, title: 'Running Shoes', price: 600, category: 'Footwear', stock: 8 }
])

// 2. New product form state
const newProduct = ref({
  title: '',
  price: '',
  category: 'Clothing',
  stock: ''
})

// 3. Function to handle adding a new product
const addProduct = () => {
  if (!newProduct.value.title || !newProduct.value.price) {
    alert('Please fill in the Product Title and Price!')
    return
  }

  products.value.push({
    id: Date.now(),
    title: newProduct.value.title,
    price: Number(newProduct.value.price),
    category: newProduct.value.category,
    stock: Number(newProduct.value.stock) || 0
  })

  // Reset form fields
  newProduct.value = { title: '', price: '', category: 'Clothing', stock: '' }
}

// 4. Function to delete a product
const deleteProduct = (id) => {
  products.value = products.value.filter(p => p.id !== id)
}
</script>

<template>
  <div class="ecommerce-container">
    <h2>Product Entry Management</h2>

    <!-- Add Product Form -->
    <form @submit.prevent="addProduct" class="product-form">
      <div class="input-group">
        <label>Product Title:</label>
        <input v-model="newProduct.title" type="text" placeholder="e.g., Casual Shoes" required />
      </div>

      <div class="input-group">
        <label>Price ($):</label>
        <input v-model="newProduct.price" type="number" placeholder="0.00" required />
      </div>

      <div class="input-group">
        <label>Category:</label>
        <select v-model="newProduct.category">
          <option value="Clothing">Clothing</option>
          <option value="Footwear">Footwear</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      <div class="input-group">
        <label>Stock Quantity:</label>
        <input v-model="newProduct.stock" type="number" placeholder="10" />
      </div>

      <button type="submit" class="btn-submit">Add Product</button>
    </form>

    <hr />

    <!-- Products Table -->
    <h3>Product List</h3>
    <table class="product-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Product Title</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(prod, index) in products" :key="prod.id">
          <td>{{ index + 1 }}</td>
          <td>{{ prod.title }}</td>
          <td>{{ prod.category }}</td>
          <td>${{ prod.price }}</td>
          <td>{{ prod.stock }}</td>
          <td>
            <button @click="deleteProduct(prod.id)" class="btn-delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.ecommerce-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  direction: ltr;
  font-family: Arial, sans-serif;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #ffffff;
}

.product-form {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 25px;
}

.input-group {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 180px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input, select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-submit {
  padding: 10px 20px;
  background-color: #2b8a3e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.product-table th, .product-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.product-table th {
  background-color: #f8f9fa;
}

.btn-delete {
  background-color: #c92a2a;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}
</style>