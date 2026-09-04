<script>
export default {
    name: "CheckoutStepper",
    props: {
        currentStep: {
            type: Number,
            default: 2, // 1: Cart, 2: Shipping, 3: Payment, 4: Review, 5: Confirmation
        },
    },
    emits: ["go-to-step"],
    data() {
        return {
            steps: [
                { id: 1, label: "Cart", route: "/cart" },
                { id: 2, label: "Shipping", stepNum: 2 },
                { id: 3, label: "Payment", stepNum: 3 },
                { id: 4, label: "Review", stepNum: 4 },
            ],
        };
    },
    methods: {
        handleStepClick(step) {
            if (step.id === 1) {
                this.$router.push("/cart");
            } else if (step.id < this.currentStep) {
                this.$emit("go-to-step", step.id);
            }
        },
    },
};
</script>

<template>
    <div class="stepper-container py-4">
        <div class="stepper-wrapper d-flex align-items-center justify-content-between mx-auto">
            <template v-for="(step, index) in steps" :key="step.id">
                <!-- Step Item -->
                <div
                    class="step-item d-flex flex-column align-items-center text-center position-relative"
                    :class="{
                        'is-completed': step.id < currentStep,
                        'is-active': step.id === currentStep,
                        'is-upcoming': step.id > currentStep,
                        'is-clickable': step.id < currentStep,
                    }"
                    @click="handleStepClick(step)"
                >
                    <!-- Step Circle Badge -->
                    <div class="step-circle mb-2 d-flex align-items-center justify-content-center">
                        <i v-if="step.id < currentStep" class="bi bi-check-lg"></i>
                        <span v-else>{{ step.id }}</span>
                    </div>

                    <!-- Step Label -->
                    <div class="step-label">
                        {{ step.label }}
                    </div>
                </div>

                <!-- Connector Line between steps -->
                <div
                    v-if="index < steps.length - 1"
                    class="step-connector flex-grow-1"
                    :class="{ 'is-completed': step.id < currentStep }"
                ></div>
            </template>
        </div>
    </div>
</template>

<style scoped>
.stepper-container {
    background-color: #ffffff;
    border-bottom: 1px solid #f1f5f9;
}

.stepper-wrapper {
    max-width: 580px;
    width: 100%;
    padding: 0 16px;
}

.step-item {
    cursor: default;
    z-index: 2;
    min-width: 60px;
}

.step-item.is-clickable {
    cursor: pointer;
}

.step-circle {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    font-size: 0.8rem;
    font-weight: 700;
    transition: all 0.2s ease;
}

/* Completed Step */
.step-item.is-completed .step-circle {
    background-color: #0c0d0e;
    color: #ffffff;
}

.step-item.is-completed .step-label {
    color: #475569;
    font-weight: 600;
}

/* Active Step */
.step-item.is-active .step-circle {
    background-color: #0c0d0e;
    color: #ffffff;
    box-shadow: 0 0 0 4px rgba(12, 13, 14, 0.1);
}

.step-item.is-active .step-label {
    color: #0c0d0e;
    font-weight: 800;
}

/* Upcoming Step */
.step-item.is-upcoming .step-circle {
    background-color: #f1f5f9;
    color: #94a3b8;
    border: 1px solid #e2e8f0;
}

.step-item.is-upcoming .step-label {
    color: #94a3b8;
    font-weight: 500;
}

.step-label {
    font-size: 0.82rem;
    letter-spacing: 0.2px;
}

/* Connector Line */
.step-connector {
    height: 2px;
    background-color: #e2e8f0;
    margin: 0 8px 24px;
    transition: background-color 0.2s ease;
}

.step-connector.is-completed {
    background-color: #0c0d0e;
}

@media (max-width: 575.98px) {
    .stepper-wrapper {
        max-width: 100%;
    }
    .step-circle {
        width: 24px;
        height: 24px;
        font-size: 0.72rem;
    }
    .step-label {
        font-size: 0.72rem;
    }
    .step-connector {
        margin: 0 4px 20px;
    }
}
</style>
