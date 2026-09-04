<template>
  <div class="container my-5" style="max-width: 800px;">
    <!-- Title Section -->
    <div class="text-center mb-4">
      <h2 class="fw-bold mb-1">Return Request</h2>
      <p class="text-muted">Order #TS-8843</p>
    </div>

    <!-- Stepper Navigation -->
    <div class="d-flex justify-content-center align-items-center mb-4 text-center">
      <div class="d-flex align-items-center me-3">
        <span class="badge bg-dark rounded-circle me-2 p-2">✓</span>
        <small class="fw-semibold">Select Items</small>
      </div>
      <div class="border-top flex-grow-1 mx-2" style="max-width: 50px;"></div>
      <div class="d-flex align-items-center me-3">
        <span class="badge bg-dark rounded-circle me-2 p-2">2</span>
        <small class="fw-semibold">Reason</small>
      </div>
      <div class="border-top flex-grow-1 mx-2" style="max-width: 50px;"></div>
      <div class="d-flex align-items-center text-muted">
        <span class="badge bg-light text-dark border rounded-circle me-2 p-2">3</span>
        <small>Confirmation</small>
      </div>
    </div>

    <!-- Main Form Card -->
    <div class="card p-4 shadow-sm border-0 bg-light">
      <!-- Selected Item Summary -->
      <div class="card p-3 mb-4 bg-white border d-flex flex-row align-items-center">
        <div class="bg-light border rounded p-2 me-3" style="width: 70px; height: 70px;">
          <img src="https://via.placeholder.com/60" alt="Keyboard" class="img-fluid" />
        </div>
        <div>
          <h6 class="fw-bold mb-1">MechTactile Keyboard V2</h6>
          <small class="text-muted d-block mb-1">QTY: 1</small>
          <span class="badge bg-primary-subtle text-primary border border-primary-subtle fs-7">SKU: MTK-V2-BLK</span>
        </div>
      </div>

      <!-- Reason Selection Header -->
      <h6 class="fw-bold mb-3">Select Reason for Return</h6>

      <!-- Reason Radio Options Grid -->
      <div class="row g-3 mb-4">
        <div class="col-md-6" v-for="reason in reasons" :key="reason.id">
          <div 
            class="card p-3 h-100 cursor-pointer border" 
            :class="{ 'border-dark bg-white': selectedReason === reason.id, 'bg-white': selectedReason !== reason.id }"
            @click="selectedReason = reason.id"
            style="cursor: pointer;"
          >
            <div class="form-check">
              <input 
                class="form-check-input" 
                type="radio" 
                name="returnReason" 
                :id="reason.id" 
                :value="reason.id" 
                v-model="selectedReason"
              >
              <label class="form-check-label fw-bold d-block cursor-pointer" :for="reason.id">
                {{ reason.title }}
              </label>
              <small class="text-muted d-block mt-1">{{ reason.description }}</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Description Field -->
      <div class="mb-4">
        <label class="form-label fw-bold">Additional Description</label>
        <textarea 
          class="form-control" 
          rows="3" 
          placeholder="Please provide specific details about the issue..."
          v-model="additionalDetails"
        ></textarea>
      </div>

      <!-- File Upload Field -->
      <div class="mb-4">
        <label class="form-label fw-bold">Upload Images (Optional)</label>
        <div class="border border-2 border-dashed rounded bg-white text-center p-4">
          <div class="mb-2">📁</div>
          <p class="mb-1 text-muted fw-semibold">Click to upload or drag and drop</p>
          <small class="text-muted">PNG, JPG up to 10MB</small>
        </div>
      </div>

      <!-- Bottom Buttons -->
      <div class="d-flex justify-content-between align-items-center pt-3">
        <button class="btn btn-outline-secondary px-4">Back</button>
        <button class="btn btn-dark px-4" @click="submitRequest">Continue</button>
      </div>
    </div>
  </div>
</template>

<style>
.border-dashed {
  border-style: dashed !important;
}
</style>

<script setup>
import { ref } from 'vue'

const selectedReason = ref('defective')
const additionalDetails = ref('')

const reasons = [
  {
    id: 'defective',
    title: 'Defective/Damaged',
    description: 'Item arrived broken or malfunctioning.'
  },
  {
    id: 'wrong_item',
    title: 'Wrong item received',
    description: 'This is not what I ordered.'
  },
  {
    id: 'performance',
    title: 'Performance not as expected',
    description: 'Item works but does not meet specifications.'
  },
  {
    id: 'changed_mind',
    title: 'Changed my mind',
    description: 'No longer need the item.'
  }
]

const submitRequest = () => {
  alert(`Reason: ${selectedReason.value}\nDetails: ${additionalDetails.value}`)
}
</script>