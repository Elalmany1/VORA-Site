<script>
import AdminSidebar from "../components/admin/AdminSidebar.vue";
import AdminHeader from "../components/admin/AdminHeader.vue";
import AdminMobileHeader from "../components/admin/AdminMobileHeader.vue";
import AdminMobileDrawer from "../components/admin/AdminMobileDrawer.vue";
import AdminMetrics from "../components/admin/AdminMetrics.vue";
import AdminCharts from "../components/admin/AdminCharts.vue";
import AdminTables from "../components/admin/AdminTables.vue";
import AdminMobileView from "../components/admin/AdminMobileView.vue";

export default {
    name: "AdminDashboard",
    components: {
        AdminSidebar,
        AdminHeader,
        AdminMobileHeader,
        AdminMobileDrawer,
        AdminMetrics,
        AdminCharts,
        AdminTables,
        AdminMobileView,
    },
    data() {
        return {
            isMobileMenuOpen: false,
            searchQuery: "",
            compareLastMonth: true,
            selectedTimeRange: "7D",
            isRefreshing: false,
            lastUpdatedText: "Just now",
            activeNav: "dashboard",
            restockSuccessMessage: "",
            
            // Desktop metric cards (Image 1)
            stats: [
                {
                    label: "TOTAL REVENUE",
                    value: "$1.2M",
                    change: "+12.5%",
                    trend: "up",
                    icon: "bi-cash-stack",
                    badgeClass: "badge-success",
                },
                {
                    label: "TOTAL ORDERS",
                    value: "4.2k",
                    change: "+8.2%",
                    trend: "up",
                    icon: "bi-cart3",
                    badgeClass: "badge-success",
                },
                {
                    label: "TOTAL CUSTOMERS",
                    value: "12k",
                    change: "+0.0%",
                    trend: "neutral",
                    icon: "bi-people",
                    badgeClass: "badge-neutral",
                },
                {
                    label: "CONV. RATE",
                    value: "3.4%",
                    change: "-1.2%",
                    trend: "down",
                    icon: "bi-graph-up-arrow",
                    badgeClass: "badge-danger",
                },
            ],

            // Desktop Low stock alerts
            lowStockItems: [
                {
                    name: "Quantum Drive X-700",
                    sku: "QD-X7-001",
                    stock: 5,
                    max: 10,
                    statusColor: "text-danger",
                },
                {
                    name: "Neural Link Node v2",
                    sku: "NL-NV2-094",
                    stock: 12,
                    max: 15,
                    statusColor: "text-warning-custom",
                },
                {
                    name: "Titanium Heat Sink",
                    sku: "THS-88-M",
                    stock: 2,
                    max: 20,
                    statusColor: "text-danger",
                },
            ],

            // Desktop recent orders
            recentOrders: [
                {
                    id: "TS-9030",
                    customer: "Global Industries Inc.",
                    amount: "$14,580.00",
                    status: "PROCESSING",
                    badgeClass: "status-processing",
                },
                {
                    id: "TS-9029",
                    customer: "Stark Logistics",
                    amount: "$2,150.50",
                    status: "SHIPPED",
                    badgeClass: "status-shipped",
                },
                {
                    id: "TS-9028",
                    customer: "Wayne Enterprises",
                    amount: "$890.00",
                    status: "DELIVERED",
                    badgeClass: "status-delivered",
                },
                {
                    id: "TS-9027",
                    customer: "CyberDyne Systems",
                    amount: "$102,480.00",
                    status: "ACTION REQ",
                    badgeClass: "status-action",
                },
            ],

            // Mobile recent orders (Image 2)
            mobileOrders: [
                {
                    id: "ORD-8924",
                    detail: "2 items • 10m ago",
                    amount: "$1,240.00",
                    status: "PAID",
                    statusClass: "badge-paid",
                },
                {
                    id: "ORD-8923",
                    detail: "1 item • 45m ago",
                    amount: "$850.00",
                    status: "PENDING",
                    statusClass: "badge-pending",
                },
                {
                    id: "ORD-8922",
                    detail: "5 items • 2h ago",
                    amount: "$3,420.50",
                    status: "PAID",
                    statusClass: "badge-paid",
                },
            ],

            // Revenue Timeline data points (for interactive tooltip on desktop)
            timelinePoints: [
                { day: "01", x: 45, y: 145, rev: "$18,200", prev: "$24,500" },
                { day: "05", x: 125, y: 110, rev: "$42,800", prev: "$28,100" },
                { day: "10", x: 205, y: 125, rev: "$36,400", prev: "$39,200" },
                { day: "15", x: 285, y: 118, rev: "$41,000", prev: "$49,800" },
                { day: "20", x: 365, y: 55, rev: "$84,500", prev: "$52,100" },
                { day: "25", x: 445, y: 72, rev: "$71,300", prev: "$46,000" },
                { day: "30", x: 525, y: 50, rev: "$88,000", prev: "$38,400" },
            ],

            // Order Status Donut segments
            orderStatusData: [
                { label: "Delivered", pct: 60, color: "#111827", class: "status-box-delivered" },
                { label: "Processing", pct: 25, color: "#3b5998", class: "status-box-processing" },
                { label: "Pending", pct: 10, color: "#94a3b8", class: "status-box-pending" },
                { label: "Cancelled", pct: 5, color: "#dc2626", class: "status-box-cancelled" },
            ],
        };
    },

    computed: {
        filteredOrders() {
            if (!this.searchQuery.trim()) return this.recentOrders;
            const q = this.searchQuery.toLowerCase();
            return this.recentOrders.filter(
                (o) =>
                    o.id.toLowerCase().includes(q) ||
                    o.customer.toLowerCase().includes(q) ||
                    o.status.toLowerCase().includes(q) ||
                    o.amount.includes(q)
            );
        },
        filteredLowStock() {
            if (!this.searchQuery.trim()) return this.lowStockItems;
            const q = this.searchQuery.toLowerCase();
            return this.lowStockItems.filter(
                (i) =>
                    i.name.toLowerCase().includes(q) ||
                    i.sku.toLowerCase().includes(q)
            );
        },
    },

    methods: {
        toggleMobileMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
        },
        closeMobileMenu() {
            this.isMobileMenuOpen = false;
        },
        setActiveNav(nav) {
            this.activeNav = nav;
            this.closeMobileMenu();
        },
        handleRefresh() {
            this.isRefreshing = true;
            setTimeout(() => {
                this.isRefreshing = false;
                this.lastUpdatedText = "Just now";
            }, 600);
        },
        handleRestock(item) {
            this.restockSuccessMessage = `Restock order initiated for ${item.name} (${item.sku})`;
            item.stock += 5;
            setTimeout(() => {
                this.restockSuccessMessage = "";
            }, 4000);
        },
    },
};
</script>

<template>
    <div class="admin-wrapper">
        <!-- ================= MOBILE OFFCANVAS DRAWER ================= -->
        <AdminMobileDrawer
            :isOpen="isMobileMenuOpen"
            :activeNav="activeNav"
            @close="closeMobileMenu"
            @select-nav="setActiveNav"
        />

        <!-- ================= DESKTOP & TABLET SIDEBAR (>= 768px) ================= -->
        <AdminSidebar
            :activeNav="activeNav"
            @select-nav="setActiveNav"
        />

        <!-- ================= MAIN CONTENT AREA ================= -->
        <div class="admin-main-container flex-grow-1">
            <!-- Mobile Header (< 768px) -->
            <AdminMobileHeader
                @toggle-menu="toggleMobileMenu"
            />

            <!-- Desktop & Tablet Header (>= 768px) -->
            <AdminHeader
                v-model:searchQuery="searchQuery"
            />

            <!-- Dashboard Content -->
            <main class="dashboard-body px-3 px-md-4 py-3 py-md-4">
                <!-- Toast Message on Action -->
                <div
                    v-if="restockSuccessMessage"
                    class="alert alert-dark d-flex align-items-center justify-content-between shadow-sm mb-3 py-2 px-3 fade show"
                    role="alert"
                >
                    <div class="d-flex align-items-center gap-2">
                        <i class="bi bi-check-circle-fill text-success"></i>
                        <span>{{ restockSuccessMessage }}</span>
                    </div>
                    <button
                        type="button"
                        class="btn-close btn-close-white"
                        @click="restockSuccessMessage = ''"
                    ></button>
                </div>

                <!-- Page Header (Overview) -->
                <div class="overview-header-row d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-4">
                    <div>
                        <h1 class="page-title mb-1">Overview</h1>
                        <p class="page-subtitle mb-0 d-none d-md-block">
                            Tenant performance metrics and system status.
                        </p>
                        <p class="page-subtitle mb-0 d-block d-md-none">
                            Real-time tenant metrics.
                        </p>
                    </div>

                    <!-- Desktop & Tablet Last Updated (>= 768px) -->
                    <div class="d-none d-md-flex align-items-center gap-2 text-muted updated-text">
                        <span>Last updated: {{ lastUpdatedText }}</span>
                        <button
                            class="btn btn-refresh p-1 border-0 text-muted"
                            @click="handleRefresh"
                            :title="'Refresh Metrics'"
                        >
                            <i
                                class="bi bi-arrow-clockwise"
                                :class="{ 'spin-anim': isRefreshing }"
                            ></i>
                        </button>
                    </div>
                </div>

                <!-- ================= DESKTOP & TABLET VIEW (>= 768px) ================= -->
                <div class="desktop-only-content d-none d-md-block">
                    <!-- 4 Metrics Cards Row -->
                    <AdminMetrics :stats="stats" />

                    <!-- Charts Row (Revenue Timeline + Order Status Donut) -->
                    <AdminCharts
                        v-model:compareLastMonth="compareLastMonth"
                        :timelinePoints="timelinePoints"
                        :orderStatusData="orderStatusData"
                    />

                    <!-- Tables Row (Low Stock Alerts + Recent Orders) -->
                    <AdminTables
                        :lowStockItems="filteredLowStock"
                        :recentOrders="filteredOrders"
                        @restock="handleRestock"
                        @navigate="setActiveNav"
                    />
                </div>

                <!-- ================= MOBILE VIEW (< 768px) ================= -->
                <AdminMobileView
                    :mobileOrders="mobileOrders"
                    v-model:selectedTimeRange="selectedTimeRange"
                    @restock="handleRestock"
                    @navigate="setActiveNav"
                />
            </main>
        </div>
    </div>
</template>

<style scoped>
/* ================= GLOBAL LAYOUT & FONTS ================= */
.admin-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    background-color: #f7f7f8;
    color: #111827;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

@media (min-width: 768px) {
    .admin-wrapper {
        flex-direction: row;
        align-items: stretch;
    }
}

.admin-main-container {
    flex: 1;
    min-width: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
}

/* ================= DASHBOARD MAIN BODY ================= */
.dashboard-body {
    background-color: #f7f7f8;
    flex: 1;
}

.page-title {
    font-size: 1.65rem;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: #0f172a;
}

.page-subtitle {
    font-size: 0.88rem;
    color: #64748b;
}

.updated-text {
    font-size: 0.82rem;
}

.btn-refresh {
    font-size: 1rem;
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-refresh:hover {
    color: #0f172a !important;
}

.spin-anim {
    animation: spin 0.6s linear infinite;
}

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}

/* Mobile Phones (< 768px) */
@media (max-width: 767.98px) {
    .dashboard-body {
        padding: 16px 14px 40px;
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
    }
    .overview-header-row {
        margin-bottom: 16px !important;
    }
    .page-title {
        font-size: 1.55rem;
        font-weight: 800;
    }
    .page-subtitle {
        font-size: 0.86rem;
        color: #64748b;
    }
}

/* Tablet (768px to 991.98px) */
@media (min-width: 768px) and (max-width: 991.98px) {
    .dashboard-body {
        padding: 20px 16px;
    }
    .page-title {
        font-size: 1.45rem;
    }
}
</style>
