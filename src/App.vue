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
                this.$route.path?.startsWith("/admin")
            );
        },
    },
};
</script>

<template>
    <AppHeader v-if="!hideHeader" />

    <RouterView />
</template>
