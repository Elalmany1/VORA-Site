<script>
import CheckoutHeader from "../components/checkout/CheckoutHeader.vue";
import CheckoutStepper from "../components/checkout/CheckoutStepper.vue";
import CheckoutOrderSummary from "../components/checkout/CheckoutOrderSummary.vue";
import StepShipping from "../components/checkout/StepShipping.vue";
import StepPayment from "../components/checkout/StepPayment.vue";
import StepReview from "../components/checkout/StepReview.vue";
import StepConfirmation from "../components/checkout/StepConfirmation.vue";
import CheckoutFooter from "../components/common/CheckoutFooter.vue";

export default {
    name: "CheckoutView",
    components: {
        CheckoutHeader,
        CheckoutStepper,
        CheckoutOrderSummary,
        StepShipping,
        StepPayment,
        StepReview,
        StepConfirmation,
        CheckoutFooter,
    },
    data() {
        return {
            currentStep: 2, // 2: Shipping, 3: Payment, 4: Review, 5: Confirmation
        };
    },
    created() {
        // Read optional step from query parameter if provided
        const qStep = this.$route.query.step;
        if (qStep === "payment" || qStep === "3") {
            this.currentStep = 3;
        } else if (qStep === "review" || qStep === "4") {
            this.currentStep = 4;
        } else if (qStep === "confirmation" || qStep === "5") {
            this.currentStep = 5;
        } else {
            this.currentStep = 2;
        }
    },
    methods: {
        goToStep(stepNum) {
            this.currentStep = stepNum;
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        handlePlaceOrder() {
            // Place order -> advance to confirmation
            this.currentStep = 5;
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        handleTrackOrder() {
            alert("Order #TS-88291 is currently being prepared for dispatch.");
        },
    },
};
</script>

<template>
    <div class="checkout-page-wrapper d-flex flex-column min-vh-100 bg-checkout">
        <!-- Dedicated Checkout Header -->
        <CheckoutHeader />

        <!-- Stepper (Visible for Steps 2, 3, 4) -->
        <CheckoutStepper
            v-if="currentStep < 5"
            :currentStep="currentStep"
            @go-to-step="goToStep"
        />

        <!-- Main Content Area -->
        <main class="flex-grow-1 py-4 py-lg-5">
            <!-- Steps 2, 3, 4: Two-column Checkout Layout -->
            <div v-if="currentStep < 5" class="container-fluid px-3 px-sm-4 px-lg-5">
                <div class="row g-4 g-xl-5">
                    <!-- Left Active Step Component -->
                    <div class="col-12 col-lg-7 col-xl-8">
                        <StepShipping
                            v-if="currentStep === 2"
                            @continue="goToStep(3)"
                        />

                        <StepPayment
                            v-else-if="currentStep === 3"
                            @continue="goToStep(4)"
                            @back-to-shipping="goToStep(2)"
                        />

                        <StepReview
                            v-else-if="currentStep === 4"
                            @edit-step="goToStep"
                            @place-order="handlePlaceOrder"
                        />
                    </div>

                    <!-- Right Sticky Order Summary -->
                    <div class="col-12 col-lg-5 col-xl-4">
                        <CheckoutOrderSummary
                            :step="currentStep"
                            :showPlaceOrderButton="currentStep === 4"
                            @place-order="handlePlaceOrder"
                        />
                    </div>
                </div>
            </div>

            <!-- Step 5: Order Confirmation (Centered Layout) -->
            <div v-else>
                <StepConfirmation
                    @track-order="handleTrackOrder"
                />
            </div>
        </main>

        <!-- Standard VORA Footer -->
        <CheckoutFooter />
    </div>
</template>

<style scoped>
.bg-checkout {
    background-color: #f7f7f8;
}
</style>
