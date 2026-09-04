<script>
export default {
    name: "AdminCharts",
    props: {
        compareLastMonth: {
            type: Boolean,
            default: true,
        },
        timelinePoints: {
            type: Array,
            required: true,
        },
        orderStatusData: {
            type: Array,
            required: true,
        },
    },
    emits: ["update:compareLastMonth"],
    data() {
        return {
            hoveredPoint: null,
        };
    },
};
</script>

<template>
    <div class="row g-3 mb-4">
        <!-- Revenue Timeline -->
        <div class="col-12 col-xl-8">
            <div class="card-box h-100">
                <div class="card-box-header d-flex justify-content-between align-items-center mb-3">
                    <h3 class="card-box-title mb-0">Revenue Timeline</h3>
                    <div class="d-flex align-items-center gap-2">
                        <label
                            for="compareToggle"
                            class="compare-label user-select-none"
                        >
                            Compare to last month
                        </label>
                        <div class="form-check form-switch mb-0">
                            <input
                                class="form-check-input custom-switch"
                                type="checkbox"
                                role="switch"
                                id="compareToggle"
                                :checked="compareLastMonth"
                                @change="$emit('update:compareLastMonth', $event.target.checked)"
                            />
                        </div>
                    </div>
                </div>

                <!-- Interactive SVG Timeline Chart -->
                <div class="timeline-chart-container position-relative">
                    <svg
                        viewBox="0 0 580 180"
                        class="timeline-svg w-100"
                        preserveAspectRatio="none"
                    >
                        <!-- Y-Axis Grid Lines & Labels -->
                        <g class="grid-lines">
                            <!-- $100k -->
                            <line x1="40" y1="20" x2="560" y2="20" stroke="#f1f5f9" stroke-width="1" />
                            <text x="5" y="24" class="axis-text">$100k</text>

                            <!-- $75k -->
                            <line x1="40" y1="55" x2="560" y2="55" stroke="#f1f5f9" stroke-width="1" />
                            <text x="12" y="59" class="axis-text">$75k</text>

                            <!-- $50k -->
                            <line x1="40" y1="90" x2="560" y2="90" stroke="#f1f5f9" stroke-width="1" />
                            <text x="12" y="94" class="axis-text">$50k</text>

                            <!-- $25k -->
                            <line x1="40" y1="125" x2="560" y2="125" stroke="#f1f5f9" stroke-width="1" />
                            <text x="12" y="129" class="axis-text">$25k</text>

                            <!-- $0 -->
                            <line x1="40" y1="160" x2="560" y2="160" stroke="#e2e8f0" stroke-width="1" />
                            <text x="24" y="163" class="axis-text">$0</text>
                        </g>

                        <!-- Last Month Dashed Comparison Curve -->
                        <path
                            v-if="compareLastMonth"
                            d="M 45 130 C 100 135, 140 120, 200 110 C 260 100, 310 85, 370 88 C 430 92, 480 110, 525 115"
                            fill="none"
                            stroke="#cbd5e1"
                            stroke-width="3"
                            stroke-dasharray="5,6"
                            stroke-linecap="round"
                        />

                        <!-- Current Month Solid Dark Curve -->
                        <path
                            d="M 45 145 C 90 95, 140 120, 205 125 C 270 130, 320 60, 365 55 C 410 50, 460 110, 525 50"
                            fill="none"
                            stroke="#0f172a"
                            stroke-width="4.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />

                        <!-- Data Points with hover state -->
                        <g
                            v-for="(p, i) in timelinePoints"
                            :key="'pt-' + i"
                            @mouseenter="hoveredPoint = p"
                            @mouseleave="hoveredPoint = null"
                            style="cursor: pointer;"
                        >
                            <circle
                                :cx="p.x"
                                :cy="p.y"
                                r="4"
                                fill="#ffffff"
                                stroke="#0f172a"
                                stroke-width="2.5"
                            />
                        </g>

                        <!-- X-Axis Labels -->
                        <g class="x-labels">
                            <text x="45" y="176" text-anchor="middle" class="axis-text">01</text>
                            <text x="125" y="176" text-anchor="middle" class="axis-text">05</text>
                            <text x="205" y="176" text-anchor="middle" class="axis-text">10</text>
                            <text x="285" y="176" text-anchor="middle" class="axis-text">15</text>
                            <text x="365" y="176" text-anchor="middle" class="axis-text">20</text>
                            <text x="445" y="176" text-anchor="middle" class="axis-text">25</text>
                            <text x="525" y="176" text-anchor="middle" class="axis-text">30</text>
                        </g>
                    </svg>

                    <!-- Floating Tooltip on Hover -->
                    <div
                        v-if="hoveredPoint"
                        class="chart-tooltip shadow-sm"
                        :style="{ left: hoveredPoint.x + 'px', top: (hoveredPoint.y - 45) + 'px' }"
                    >
                        <div class="tooltip-title">Day {{ hoveredPoint.day }}</div>
                        <div class="tooltip-val">{{ hoveredPoint.rev }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Order Status Donut Chart -->
        <div class="col-12 col-xl-4">
            <div class="card-box h-100">
                <div class="card-box-header mb-3">
                    <h3 class="card-box-title mb-0">Order Status</h3>
                </div>

                <div class="donut-wrapper d-flex justify-content-center align-items-center py-2 position-relative">
                    <svg width="180" height="180" viewBox="0 0 180 180" class="donut-svg">
                        <circle
                            cx="90"
                            cy="90"
                            r="60"
                            fill="transparent"
                            stroke="#111827"
                            stroke-width="18"
                            stroke-dasharray="226.2 377"
                            stroke-dashoffset="0"
                            transform="rotate(-90 90 90)"
                        />
                        <circle
                            cx="90"
                            cy="90"
                            r="60"
                            fill="transparent"
                            stroke="#3b5998"
                            stroke-width="18"
                            stroke-dasharray="94.25 377"
                            stroke-dashoffset="-226.2"
                            transform="rotate(-90 90 90)"
                        />
                        <circle
                            cx="90"
                            cy="90"
                            r="60"
                            fill="transparent"
                            stroke="#94a3b8"
                            stroke-width="18"
                            stroke-dasharray="37.7 377"
                            stroke-dashoffset="-320.45"
                            transform="rotate(-90 90 90)"
                        />
                        <circle
                            cx="90"
                            cy="90"
                            r="60"
                            fill="transparent"
                            stroke="#dc2626"
                            stroke-width="18"
                            stroke-dasharray="18.85 377"
                            stroke-dashoffset="-358.15"
                            transform="rotate(-90 90 90)"
                        />
                    </svg>

                    <!-- Donut Center Label -->
                    <div class="donut-center-text text-center">
                        <div class="donut-total">4.2k</div>
                        <div class="donut-label">Orders</div>
                    </div>
                </div>

                <!-- Legend List -->
                <div class="donut-legend mt-3">
                    <div
                        class="legend-item d-flex justify-content-between align-items-center mb-1"
                        v-for="(seg, idx) in orderStatusData"
                        :key="idx"
                    >
                        <div class="d-flex align-items-center gap-2">
                            <span class="legend-color-box" :class="seg.class"></span>
                            <span class="legend-text">{{ seg.label }}</span>
                        </div>
                        <span class="legend-pct">{{ seg.pct }}%</span>
                    </div>
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

.compare-label {
    font-size: 0.8rem;
    color: #64748b;
    font-weight: 500;
    cursor: pointer;
}

.custom-switch {
    cursor: pointer;
}

.custom-switch:checked {
    background-color: #0f172a;
    border-color: #0f172a;
}

.timeline-chart-container {
    height: 190px;
    width: 100%;
}

.timeline-svg {
    height: 100%;
}

.axis-text {
    font-size: 10px;
    fill: #94a3b8;
    font-weight: 500;
}

.chart-tooltip {
    position: absolute;
    background-color: #0f172a;
    color: #ffffff;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.72rem;
    pointer-events: none;
    transform: translateX(-50%);
    z-index: 20;
    white-space: nowrap;
}

.tooltip-title {
    color: #94a3b8;
    font-size: 0.65rem;
}

.tooltip-val {
    font-weight: 700;
}

.donut-wrapper {
    min-height: 190px;
}

.donut-center-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
}

.donut-total {
    font-size: 1.45rem;
    font-weight: 800;
    color: #0f172a;
    line-height: 1;
}

.donut-label {
    font-size: 0.75rem;
    color: #64748b;
    font-weight: 500;
}

.legend-item {
    font-size: 0.82rem;
    color: #475569;
}

.legend-color-box {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    display: inline-block;
}

.status-box-delivered {
    background-color: #111827;
}

.status-box-processing {
    background-color: #3b5998;
}

.status-box-pending {
    background-color: #94a3b8;
}

.status-box-cancelled {
    background-color: #dc2626;
}

.legend-pct {
    font-weight: 600;
    color: #0f172a;
}

/* Tablet (768px to 991.98px) */
@media (min-width: 768px) and (max-width: 991.98px) {
    .card-box {
        padding: 16px;
    }
    .donut-wrapper svg {
        width: 150px;
        height: 150px;
    }
}
</style>
