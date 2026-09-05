<script>
import ProductDetailsComponent from "./ProductDetailsComponent.vue";

export default {
    name: "ProductsComponent",

    components: {
        ProductDetailsComponent,
    },

    props: {
        products: {
            type: Array,
            required: true,
        },
    },

    emits: ["add-to-cart", "view-details"],

    methods: {
        handleAddToCart(product) {
            this.$emit("add-to-cart", product);
        },

        handleViewDetails(product) {
            this.$emit("view-details", product);
        },
    },
};
</script>

<template>
    <div class="row g-3">
        <div
            v-for="product in products"
            :key="product.id"
            class="col-12 col-sm-6 col-xl-4"
        >
            <ProductDetailsComponent
                :product="product"
                @add-to-cart="handleAddToCart"
                @view-details="handleViewDetails"
            />
        </div>
    </div>
</template>

<style scoped>
/*
    Bootstrap grid is used by the parent component.

    This component only controls the product cards layout.
*/

.products-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
}

@media (max-width: 1199.98px) {
    .products-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 575.98px) {
    .products-grid {
        grid-template-columns: 1fr;
    }
}
</style>
