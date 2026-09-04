<script>
export default {
    name: "AdminMetrics",
    props: {
        stats: {
            type: Array,
            required: true,
        },
    },
};
</script>

<template>
    <div class="row g-3 mb-4">
        <div
            class="col-6 col-xl-3"
            v-for="(card, index) in stats"
            :key="index"
        >
            <div class="metric-card">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <span class="metric-label">{{ card.label }}</span>
                    <i :class="['bi', card.icon, 'metric-icon']"></i>
                </div>
                <div class="metric-value">{{ card.value }}</div>
                <div class="metric-footer mt-2">
                    <span class="badge-pill" :class="card.badgeClass">
                        <i
                            class="bi"
                            :class="{
                                'bi-arrow-up-right': card.trend === 'up',
                                'bi-arrow-down-right': card.trend === 'down',
                                'bi-arrow-right': card.trend === 'neutral',
                            }"
                        ></i>
                        {{ card.change }}
                    </span>
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
    padding: 18px 20px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.metric-card:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.metric-label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.6px;
    color: #64748b;
    text-transform: uppercase;
}

.metric-icon {
    font-size: 1.15rem;
    color: #94a3b8;
}

.metric-value {
    font-size: 1.85rem;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.1;
    letter-spacing: -0.5px;
}

.badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.73rem;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 4px;
}

.badge-success {
    background-color: #dcfce7;
    color: #16a34a;
}

.badge-neutral {
    background-color: #f1f5f9;
    color: #64748b;
}

.badge-danger {
    background-color: #fee2e2;
    color: #dc2626;
}

/* Tablet (768px to 991.98px) */
@media (min-width: 768px) and (max-width: 991.98px) {
    .metric-card {
        padding: 14px 16px;
    }
    .metric-value {
        font-size: 1.45rem;
    }
}
</style>
