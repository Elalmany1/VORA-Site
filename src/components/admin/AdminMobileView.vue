<script>
export default {
    name: "AdminMobileView",
    props: {
        mobileOrders: {
            type: Array,
            required: true,
        },
        selectedTimeRange: {
            type: String,
            default: "7D",
        },
    },
    emits: ["restock", "navigate", "update:selectedTimeRange"],
};
</script>

<template>
    <div class="mobile-only-content d-block d-md-none">
        <!-- 1. TOTAL REVENUE CARD -->
        <div class="metric-card mobile-rev-card mb-3">
            <div class="d-flex justify-content-between align-items-start mb-1">
                <span class="metric-label">TOTAL REVENUE</span>
                <i class="bi bi-arrow-up-right text-muted fs-6"></i>
            </div>
            <div class="metric-value">$124,500</div>
            <div class="text-success small fw-medium mt-1">
                <i class="bi bi-arrow-up"></i> 12.5% vs last month
            </div>
        </div>

        <!-- 2. TWO-COLUMN MINI CARDS (ORDERS & CONV. RATE) -->
        <div class="row g-2 mb-3">
            <div class="col-6">
                <div class="metric-card h-100">
                    <span class="metric-label">ORDERS</span>
                    <div class="metric-value mt-1">1,248</div>
                    <div class="progress-indicator mt-3">
                        <div class="progress-fill" style="width: 72%;"></div>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="metric-card h-100">
                    <span class="metric-label">CONV. RATE</span>
                    <div class="metric-value mt-1">3.4%</div>
                    <div class="text-danger small fw-medium mt-2">
                        <i class="bi bi-arrow-down"></i> 0.2%
                    </div>
                </div>
            </div>
        </div>

        <!-- 3. PRIORITY ALERTS SECTION -->
        <section class="priority-alerts-section mb-3">
            <div class="section-title-row d-flex align-items-center gap-1 mb-2">
                <i class="bi bi-exclamation-triangle text-danger"></i>
                <span class="section-title">Priority Alerts</span>
            </div>

            <div class="priority-alert-box d-flex align-items-start gap-3 p-3">
                <div class="alert-icon-square">
                    <i class="bi bi-box-seam text-danger fs-5"></i>
                </div>
                <div class="flex-grow-1">
                    <h4 class="alert-box-title mb-1">
                        Low Stock: Quantum Processor X9
                    </h4>
                    <p class="alert-box-desc mb-2">
                        Only 4 units remaining in primary warehouse. Expected restock in 14 days.
                    </p>
                    <button
                        class="btn-review-inventory p-0 border-0 bg-transparent"
                        @click="$emit('restock', { name: 'Quantum Processor X9', sku: 'QP-X9-002', stock: 4 })"
                    >
                        REVIEW INVENTORY &rarr;
                    </button>
                </div>
            </div>
        </section>

        <!-- 4. REVENUE TREND BAR CHART -->
        <div class="card-box mb-3">
            <div class="card-box-header d-flex justify-content-between align-items-center mb-3">
                <h3 class="card-box-title mb-0">Revenue Trend</h3>
                <div class="trend-select-wrap">
                    <select
                        :value="selectedTimeRange"
                        @change="$emit('update:selectedTimeRange', $event.target.value)"
                        class="form-select form-select-sm range-select"
                    >
                        <option value="7D">7D</option>
                        <option value="30D">30D</option>
                        <option value="90D">90D</option>
                    </select>
                </div>
            </div>

            <!-- Gray chart container with vertical bars -->
            <div class="mobile-bar-chart-area p-3 rounded">
                <div class="mobile-bars-flex d-flex align-items-end justify-content-between">
                    <div class="m-bar gray-bar" style="height: 25%;"></div>
                    <div class="m-bar gray-bar" style="height: 40%;"></div>
                    <div class="m-bar gray-bar" style="height: 20%;"></div>
                    <div class="m-bar gray-bar" style="height: 55%;"></div>
                    <div class="m-bar gray-bar" style="height: 50%;"></div>
                    <div class="m-bar black-bar" style="height: 92%;"></div>
                    <div class="m-bar gray-bar" style="height: 65%;"></div>
                </div>
            </div>
        </div>

        <!-- 5. RECENT ORDERS (MOBILE LIST) -->
        <div class="card-box mb-3">
            <div class="card-box-header d-flex justify-content-between align-items-center mb-2">
                <h3 class="card-box-title mb-0">Recent Orders</h3>
                <button
                    class="btn-link-action border-0 bg-transparent text-muted"
                    @click="$emit('navigate', 'orders')"
                >
                    VIEW ALL
                </button>
            </div>

            <div class="mobile-orders-list">
                <div
                    class="mobile-order-row d-flex align-items-center justify-content-between py-3"
                    :class="{ 'border-bottom': idx < mobileOrders.length - 1 }"
                    v-for="(item, idx) in mobileOrders"
                    :key="idx"
                >
                    <div class="d-flex align-items-center gap-3">
                        <div class="order-box-icon">
                            <i class="bi bi-hdd"></i>
                        </div>
                        <div>
                            <div class="order-code fw-bold text-dark">
                                {{ item.id }}
                            </div>
                            <div class="order-subtext text-muted small">
                                {{ item.detail }}
                            </div>
                        </div>
                    </div>

                    <div class="text-end">
                        <div class="order-amount fw-bold text-dark font-monospace mb-1">
                            {{ item.amount }}
                        </div>
                        <span class="mobile-badge" :class="item.statusClass">
                            {{ item.status }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.metric-card {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 16px 18px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.metric-label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.6px;
    color: #64748b;
    text-transform: uppercase;
}

.metric-value {
    font-size: 1.65rem;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.1;
    letter-spacing: -0.5px;
}

.mobile-rev-card {
    border-left: 4px solid #0f172a;
}

.progress-indicator {
    height: 4px;
    width: 100%;
    background-color: #f1f5f9;
    border-radius: 2px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background-color: #0f172a;
    border-radius: 2px;
}

.priority-alerts-section {
    margin-top: 4px;
}

.section-title {
    font-size: 0.88rem;
    font-weight: 700;
    color: #0f172a;
}

.priority-alert-box {
    background-color: #fff1f2;
    border: 1px solid #fecdd3;
    border-radius: 8px;
}

.alert-icon-square {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    background-color: #ffe4e6;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.alert-box-title {
    font-size: 0.88rem;
    font-weight: 700;
    color: #881337;
}

.alert-box-desc {
    font-size: 0.78rem;
    color: #9f1239;
    line-height: 1.35;
}

.btn-review-inventory {
    font-size: 0.73rem;
    font-weight: 800;
    letter-spacing: 0.5px;
    color: #0f172a;
    text-decoration: underline;
    cursor: pointer;
}

.card-box {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 16px 18px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.card-box-header {
    min-height: 28px;
}

.card-box-title {
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
}

.range-select {
    width: 72px;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 6px;
    padding-top: 3px;
    padding-bottom: 3px;
    border-color: #e2e8f0;
}

.mobile-bar-chart-area {
    background-color: #f8fafc;
    border: 1px solid #f1f5f9;
}

.mobile-bars-flex {
    height: 110px;
    gap: 8px;
}

.m-bar {
    flex: 1;
    border-radius: 4px 4px 0 0;
    transition: height 0.3s ease;
}

.gray-bar {
    background-color: #cbd5e1;
}

.black-bar {
    background-color: #0c0d0e;
}

.btn-link-action {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.4px;
    cursor: pointer;
}

.order-box-icon {
    width: 38px;
    height: 38px;
    border-radius: 6px;
    background-color: #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #475569;
    font-size: 1.1rem;
    flex-shrink: 0;
}

.order-code {
    font-size: 0.85rem;
    letter-spacing: 0.2px;
}

.order-subtext {
    font-size: 0.72rem;
}

.order-amount {
    font-size: 0.88rem;
    line-height: 1.2;
}

.mobile-badge {
    font-size: 0.62rem;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 3px;
    display: inline-block;
    letter-spacing: 0.4px;
}

.badge-paid {
    background-color: #dcfce7;
    color: #16a34a;
}

.badge-pending {
    background-color: #fef08a;
    color: #854d0e;
}
</style>
