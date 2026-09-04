<script>
import AppHeader from "./components/AppHeader.vue";

export default {
    components: {
        AppHeader,
    },
    computed: {
        hideHeader() {
            return (
                this.$route.meta?.hideHeader ||
                this.$route.path?.startsWith("/admin") ||
                this.$route.path?.startsWith("/checkout")
            );
        },
    },
};
</script>

<template>
    <AppHeader v-if="!hideHeader" />

    <RouterView />
</template>
