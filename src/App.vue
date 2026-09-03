<script>
import AppHeader from "./components/AppHeader.vue";

export default {
    components: {
        AppHeader,
    },
};
</script>

<template>
    <AppHeader />

    <RouterView />
</template>
