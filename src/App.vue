<template>
    <NavbarComp />

    <div class="container">
        <router-view />
    </div>

    <ToastComp />

</template>

<script>
import ToastComp from "@/components/ToastComp.vue";
import NavbarComp from "@/components/NavbarComp.vue";

export default {
    components: {
        ToastComp,
        NavbarComp,
    },
}
</script>

<style scoped>

</style>