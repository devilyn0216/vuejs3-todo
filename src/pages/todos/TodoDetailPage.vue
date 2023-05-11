<template>
  <h1>Todo Page</h1>
  <TodoFormComp :editing="true" />
</template>

<script>
import TodoFormComp from "@/components/TodoFormComp.vue";
export default {
    components: {
        TodoFormComp,
    },
    setup(){
        return {

        };
    }
};
</script>

<style scoped>

</style>