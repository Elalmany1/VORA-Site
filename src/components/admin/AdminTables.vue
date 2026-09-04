<script>
export default {
    name: "AdminTables",
    props: {
        lowStockItems: {
            type: Array,
            required: true,
        },
        recentOrders: {
            type: Array,
            required: true,
        },
    },
    emits: ["restock", "navigate"],
};
</script>

<template>
    <div class="row g-3">
        <!-- Low Stock Alerts Table -->
        <div class="col-12 col-xl-5">
            <div class="card-box h-100">
                <div class="card-box-header d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center gap-1">
                        <i class="bi bi-exclamation-triangle text-danger me-1"></i>
                        <h3 class="card-box-title mb-0">Low Stock Alerts</h3>
                    </div>
                    <button
                        class="btn-link-action border-0 bg-transparent text-muted"
                        @click="$emit('navigate', 'inventory')"
                    >
                        View All
                    </button>
                </div>

                <div class="table-responsive">
                    <table class="table table-borderless align-middle table-custom mb-0">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>SKU</th>
                                <th>Stock</th>
                                <th class="text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, idx) in lowStockItems"
                                :key="idx"
                            >
                                <td class="fw-medium text-dark">{{ item.name }}</td>
                                <td class="text-muted text-nowrap font-monospace small">
                                    {{ item.sku }}
                                </td>
                                <td>
                                    <span :class="['fw-bold', item.statusColor]">
                                        {{ item.stock }}
                                    </span>
                                    <span class="text-muted"> / {{ item.max }}</span>
                                </td>
                                <td class="text-end">
                                    <button
                                        class="btn btn-restock"
                                        @click="$emit('restock', item)"
                                    >
                                        Restock
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Recent Orders Table -->
        <div class="col-12 col-xl-7">
            <div class="card-box h-100">
                <div class="card-box-header d-flex justify-content-between align-items-center mb-3">
                    <h3 class="card-box-title mb-0">Recent Orders</h3>
                    <button
                        class="btn btn-icon text-muted p-0 border-0"
                        title="More Options"
                    >
                        <i class="bi bi-three-dots"></i>
                    </button>
                </div>

                <div class="table-responsive">
                    <table class="table table-borderless align-middle table-custom mb-0">
                        <thead>
                            <tr>
                                <th>Order #</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th class="text-end">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(order, idx) in recentOrders"
                                :key="idx"
                            >
                                <td class="font-monospace fw-semibold text-dark">
                                    {{ order.id }}
                                </td>
                                <td class="text-dark">{{ order.customer }}</td>
                                <td class="font-monospace fw-medium">{{ order.amount }}</td>
                                <td class="text-end">
                                    <span
                                        class="order-badge"
                                        :class="order.badgeClass"
                                    >
                                        {{ order.status }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-box {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 20px 22px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.card-box-header {
    min-height: 32px;
}

.card-box-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.2px;
}

.btn-link-action {
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.15s ease;
}

.btn-link-action:hover {
    color: #0f172a !important;
}

.table-custom {
    font-size: 0.86rem;
}

.table-custom th {
    font-size: 0.72rem;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 10px 12px;
    border-bottom: 1px solid #f1f5f9;
}

.table-custom td {
    padding: 12px 12px;
    border-bottom: 1px solid #f8fafc;
}

.btn-restock {
    background-color: #0f172a;
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 4px;
    border: none;
    transition: all 0.15s ease;
}

.btn-restock:hover {
    background-color: #1e293b;
}

.order-badge {
    font-size: 0.68rem;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 4px;
    letter-spacing: 0.5px;
}

.status-processing {
    background-color: #eff6ff;
    color: #2563eb;
}

.status-shipped {
    background-color: #f0fdf4;
    color: #16a34a;
}

.status-delivered {
    background-color: #f1f5f9;
    color: #475569;
}

.status-action {
    background-color: #fef2f2;
    color: #dc2626;
}

.text-warning-custom {
    color: #d97706;
}

/* Tablet (768px to 991.98px) */
@media (min-width: 768px) and (max-width: 991.98px) {
    .card-box {
        padding: 16px;
    }
}
</style>
