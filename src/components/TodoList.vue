<template>
    <ListComp
        :items="todos"
    >
<!--    <div-->
<!--        class="card mt-2"-->
<!--        v-for="(todo, index) in todos"-->
<!--        :key="todo.id"-->
<!--    >-->
        <template #default="{ item, index }">
            <div
                class="card-body p-2 d-flex align-items-center"
                @click="moveToPage(item.id)"
                style="cursor: pointer;"
            >
                <div class="flex-grow-1">
                    <input
                        class="ml-2 mr-2"
                        type="checkbox"
                        :checked="item.completed"
                        @change.stop="toggleTodo(index, $event)"
                        @click.stop
                    >
                    <span :class="{todo: item.completed}">
                        {{item.subject}}
                    </span>
                </div>
                <div>
                    <button
                        class="btn btn-danger btn-sm"
                        @click.stop="openModal(item.id)"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </template>
<!--    </div>-->
    </ListComp>
    <teleport to="#modal">
        <DeleteModalComp
            v-if="showModal"
            @close="closeModal"
            @delete="deleteTodo"
        />
    </teleport>
</template>

<script>
import {useRouter} from "vue-router";
import DeleteModalComp from "@/components/DeleteModalComp.vue";
import {ref} from "vue";
import ListComp from "@/components/ListComp.vue";

export default {
    components: {
        DeleteModalComp,
        ListComp,
    },

    props: {
        todos: {
            type: Array,
            required: true,
        }
    },

    emits: ['toggle-todo', 'delete-todo'],

    setup(props, { emit }){
        const router = useRouter();
        const showModal = ref(false);
        const todoDeleteId = ref(null);
        const toggleTodo = (index, event) => {
            emit('toggle-todo', index, event.target.checked);
        };

        const deleteTodo = () => {
            emit('delete-todo', todoDeleteId.value);

            showModal.value = false;
            todoDeleteId.value = null;
        };

        const openModal = (id) => {
            todoDeleteId.value = id;
            showModal.value = true;
        };

        const closeModal = () => {
            todoDeleteId.value = null;
            showModal.value = false;
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
            showModal,
            openModal,
            closeModal,
        }
    }
}
</script>

<style scoped>

</style>