<template>
    <div>
        <div class="d-flex justify-content-between mb-3">
            <h2>To-Do List</h2>
            <button class="btn btn-primary" @click="moveToCratePage">Create Todo</button>
        </div>

        <input
            class="form-control"
            type="text"
            v-model="searchText"
            placeholder="Search"
            @keyup.enter="searchTodo"
        >
        <hr>
        <div style="color: red;">{{ error }}</div>
        <div v-if="!todos.length">
            There is nothing to display
        </div>
        <TodoList :todos="todos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo" />
        <hr>
<!--        <nav aria-label="Page navigation example">-->
<!--            <ul class="pagination">-->
<!--                <li v-if="currentPage !== 1" class="page-item"><a style="cursor: pointer;" class="page-link" @click="getTodos(currentPage-1)">Previous</a></li>-->
<!--                <li-->
<!--                    class="page-item"-->
<!--                    v-for="page in numberOfPages"-->
<!--                    :key="page"-->
<!--                    :class="currentPage === page ? 'active': ''"-->
<!--                >-->
<!--                    <a style="cursor: pointer;" class="page-link" href="#" @click="getTodos(page)">{{ page }}</a>-->
<!--                </li>-->
<!--                <li v-if="currentPage !== numberOfPages" class="page-item"><a style="cursor: pointer;" class="page-link" @click="getTodos(currentPage+1)">Next</a></li>-->
<!--            </ul>-->
<!--        </nav>-->
        <PaginationComp
            v-if="todos.length"
            :currentPage="currentPage"
            :numberOfPages="numberOfPages"
            @click="getTodos"
        />
    </div>
</template>

<script>
import {computed, ref, watch} from "vue";
import TodoList from "@/components/TodoList.vue";
import axios from "@/axios";
import { useToast } from "@/composables/toast";
import {useRouter} from "vue-router";
import PaginationComp from "@/components/PaginationComp.vue";


export default {
    components: {
        PaginationComp,
        TodoList,
    },
    setup() {
        const router = useRouter();

        const todos = ref([]);
        const error = ref('');
        const numberOfTodos = ref(0);
        const limit = 5;
        const currentPage = ref(1);
        const searchText = ref('');

        const numberOfPages = computed(() => {
            return Math.ceil(numberOfTodos.value/limit);
        });

        const {
            toastMessage,
            toastAlertType,
            showToast,
            triggerToast,
        } = useToast();

        const getTodos = async (page = currentPage.value) => {
            currentPage.value = page;
            try {
                const res = await axios.get(`todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`);
                numberOfTodos.value = res.headers['x-total-count'];
                todos.value = res.data;
            }catch (e) {
                console.log(e);
                error.value = 'Somthing went wrong.';
                triggerToast('Something went wrong', 'danger');
            }
        };

        getTodos();

        const addTodo = async (todo) => {
            error.value = '';

            try {
                await axios.post('todos', {
                    subject: todo.subject,
                    completed: todo.completed,
                });

                getTodos(1);
            }catch (e) {
                console.log(e);
                error.value = 'Somthing went wrong.';
                triggerToast('Something went wrong', 'danger');
            }
        }

        const deleteTodo = async (id) => {
            error.value = '';
            try {
                await axios.delete('todos/' + id);
                getTodos(1);
            }catch (e) {
                console.log(e);
                error.value = 'Somthing went wrong.';
                triggerToast('Something went wrong', 'danger');
            }
        };

        const toggleTodo = async (index, checked) => {
            error.value = '';
            const id = todos.value[index].id;
            try {
                await axios.patch('todos/' + id, {
                    completed: checked,
                });
                todos.value[index].completed = checked;
            }catch (e){
                console.log(e);
                error.value = 'Somthing went wrong.';
                triggerToast('Something went wrong', 'danger');
            }
        };

        let timeout = null;
        const searchTodo = () => {
            clearTimeout(timeout);
            getTodos(1);
        };
        watch(searchText, () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                getTodos(1);
            }, 2000);
        });

        const moveToCratePage = () => {
            router.push({
                name: 'TodoCreate',
            })
        };



        return {
            todos,
            addTodo,
            deleteTodo,
            toggleTodo,
            searchText,
            // filteredTodos,
            error,
            numberOfPages,
            currentPage,
            getTodos,
            searchTodo,
            toastMessage,
            toastAlertType,
            showToast,
            moveToCratePage,
        }
    },
}
</script>

<style>
.todo {
    color: gray;
    text-decoration: line-through;
}
</style>