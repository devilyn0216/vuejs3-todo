<template>
    <div class="form-group">
        <label>{{ label }}</label>
        <input :value="subject"
               class="form-control"
               type="text"
               @input="onInput"
        >
        <div v-if="error" class="text-red">{{ error }}</div>
    </div>
</template>

<script>
export default {
    name: "InputComp",
    props: {
        label: {
            type: String,
            required: true,
        },
        error: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
    },
    setup(props, { emit } ){
        const onInput = (e) => {
            emit('update:subject', e.target.value);
        };

        return {
            onInput,
        }
    }
}
</script>

<style scoped>
.text-red{
    color: red;
}
</style>