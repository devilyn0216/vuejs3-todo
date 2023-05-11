<template>
    <div
        class="card mt-2"
        v-for="(todo, index) in todos"
        :key="todo.id"
    >
        <div
            class="card-body p-2 d-flex align-items-center"
            @click="moveToPage(todo.id)"
            style="cursor: pointer;"
        >
            <div class="form-check flex-grow-1">
                <input
                    type="checkbox"
                    class="form-check-input"
                    :checked="todo.completed"
                    @change.stop="toggleTodo(index, $event)"
                    @click.stop
                >
                <label
                    class="form-check-label"
                    :class="{todo: todo.completed}"
                >
                    {{todo.subject}}
                </label>
            </div>
            <div>
                <button
                    class="btn btn-danger btn-sm"
                    @click.stop="deleteTodo(index)"
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {useRouter} from "vue-router";

export default {
    props: {
        todos: {
            type: Array,
            required: true,
        }
    },

    emits: ['toggle-todo', 'delete-todo'],

    setup(props, { emit }){
        const router = useRouter();
        const toggleTodo = (index, event) => {
            emit('toggle-todo', index, event.target.checked);
        };

        const deleteTodo = (index) => {
            emit('delete-todo', index);
        };

        const moveToPage = (todoId) => {
            router.push({
                name: 'Todo',
                params: {
                    id: todoId,
                }
            });
        };

        return {
            toggleTodo,
            deleteTodo,
            moveToPage,
        }
    }
}
</script>

<style scoped>

</style>